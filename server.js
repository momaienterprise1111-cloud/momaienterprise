const http = require('http');
const fs = require('fs');
const path = require('path');
let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  console.warn('Nodemailer not available, email will use preview mode');
}

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = fs.existsSync(path.join(__dirname, 'public')) ? path.join(__dirname, 'public') : __dirname;
const DB_FILE = path.join(__dirname, 'database.json');
const BACKUPS_DIR = path.join(__dirname, 'backups');

// In-memory store for 6-digit OTP verification
const otpStore = new Map();

// Ensure public folder and static assets exist
const PUBLIC_FOLDER = path.join(__dirname, 'public');
if (!fs.existsSync(PUBLIC_FOLDER)) {
  try {
    fs.mkdirSync(PUBLIC_FOLDER, { recursive: true });
  } catch (e) {
    console.error('Error creating public dir:', e);
  }
}
const STATIC_ASSETS = ['index.html', 'style.css', 'app.js', 'xlsx.full.min.js', 'logo.jpg', 'manifest.json'];
for (const file of STATIC_ASSETS) {
  const src = path.join(__dirname, file);
  const dst = path.join(PUBLIC_FOLDER, file);
  if (fs.existsSync(src)) {
    try {
      if (!fs.existsSync(dst) || fs.statSync(src).mtimeMs > fs.statSync(dst).mtimeMs) {
        fs.copyFileSync(src, dst);
      }
    } catch (err) {
      console.warn(`Could not sync ${file} to public/ folder:`, err.message);
    }
  }
}

// Ensure backups directory exists
if (!fs.existsSync(BACKUPS_DIR)) {
  try {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  } catch (e) {
    console.error('Error creating backups dir:', e);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

// Real-time Event Streaming (SSE) and DB Versioning
const sseClients = new Set();
let dbVersion = Date.now();

function broadcastSse(eventType, dataObj) {
  const msg = `data: ${JSON.stringify({ type: eventType, data: dataObj, version: dbVersion, timestamp: Date.now() })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(msg);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// Periodic keepalive for open SSE streams
setInterval(() => {
  for (const client of sseClients) {
    try {
      client.write(': keepalive\n\n');
    } catch (e) {
      sseClients.delete(client);
    }
  }
}, 15000);

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // API Endpoint: Real-time Server-Sent Events (SSE) stream
  if (reqUrl === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', version: dbVersion, message: 'Real-time sync stream connected' })}\n\n`);
    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // API Endpoint: Check DB Version & Status (Lightweight Heartbeat)
  if (reqUrl === '/api/data/status' && req.method === 'GET') {
    let count = 0;
    try {
      if (fs.existsSync(DB_FILE)) {
        const d = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        count = Array.isArray(d.callingList) ? d.callingList.length : 0;
      }
    } catch (e) {}

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ version: dbVersion, count: count, timestamp: Date.now() }));
    return;
  }

  // API Endpoint: Save Database, Smart Merge, Auto-Backup & Live Broadcast
  if (reqUrl === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON payload');
        }

        // Read current database on disk if exists
        let currentDb = {};
        if (fs.existsSync(DB_FILE)) {
          try {
            currentDb = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
          } catch (e) {
            console.warn('Error reading existing db, using empty:', e);
          }
        }

        // Data Integrity & Smart Merge:
        // 1. If payload has callingList, handle intelligent merge & deletion
        let mergedCallingList = parsed.callingList;
        if (Array.isArray(mergedCallingList)) {
          const currentCalling = Array.isArray(currentDb.callingList) ? currentDb.callingList : [];
          
          // If deletedId or deletedIds is provided by client, filter them out
          const deletedIds = new Set();
          if (parsed.deletedId) deletedIds.add(parsed.deletedId);
          if (Array.isArray(parsed.deletedIds)) parsed.deletedIds.forEach(id => deletedIds.add(id));

          // If incoming list is smaller than current list and NO explicit delete was specified,
          // merge existing records so a stale client cannot wipe out recently uploaded records from another employee!
          if (deletedIds.size > 0) {
            // Explicit delete: filter both current and incoming
            mergedCallingList = mergedCallingList.filter(c => !deletedIds.has(c.id));
          } else if (currentCalling.length > mergedCallingList.length) {
            // Check if existing records are missing in incoming payload
            const incomingIds = new Set(mergedCallingList.map(c => c.id));
            currentCalling.forEach(existing => {
              if (!incomingIds.has(existing.id)) {
                // Keep the existing record so it's not lost!
                mergedCallingList.push(existing);
              }
            });
          }
          parsed.callingList = mergedCallingList;
        } else if (Array.isArray(currentDb.callingList)) {
          // If incoming payload accidentally missed callingList, PRESERVE existing
          parsed.callingList = currentDb.callingList;
        }

        // 2. Preserve employees if incoming is empty
        if (!Array.isArray(parsed.employees) || parsed.employees.length === 0) {
          if (Array.isArray(currentDb.employees) && currentDb.employees.length > 0) {
            parsed.employees = currentDb.employees;
          }
        }

        // 3. Preserve documentTypes if incoming is empty
        if (!Array.isArray(parsed.documentTypes) || parsed.documentTypes.length === 0) {
          if (Array.isArray(currentDb.documentTypes) && currentDb.documentTypes.length > 0) {
            parsed.documentTypes = currentDb.documentTypes;
          }
        }

        // 4. Preserve admin owner info (do not allow employee session to overwrite admin owner)
        if (currentDb.admin && (!parsed.admin || parsed.admin.role !== 'Admin')) {
          parsed.admin = currentDb.admin;
        }

        // Clean internal flags before saving to disk
        delete parsed.deletedId;
        delete parsed.deletedIds;

        // Increment version timestamp
        dbVersion = Date.now();
        parsed._version = dbVersion;
        parsed._lastUpdated = new Date().toISOString();

        const jsonStr = JSON.stringify(parsed, null, 2);

        // 1. Save to primary hard-disk database.json
        fs.writeFileSync(DB_FILE, jsonStr, 'utf8');

        // 2. Create dated backup in backups folder
        const todayStr = new Date().toISOString().slice(0, 10);
        const backupFile = path.join(BACKUPS_DIR, `backup_${todayStr}.json`);
        fs.writeFileSync(backupFile, jsonStr, 'utf8');

        // 3. Broadcast real-time update to ALL connected clients (Admin + Employees)
        broadcastSse('DATA_UPDATED', {
          version: dbVersion,
          count: parsed.callingList ? parsed.callingList.length : 0,
          updatedBy: parsed.lastModifiedBy || 'CRM User',
          timestamp: parsed._lastUpdated
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          version: dbVersion, 
          count: parsed.callingList ? parsed.callingList.length : 0,
          message: 'Saved to hard disk and live synced across all screens' 
        }));
      } catch (err) {
        console.error('Error saving database:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Helper: Mask email (e.g. s***r@momai.com)
  function maskEmail(email) {
    if (!email || !email.includes('@')) return email || 'registered email';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `${user[0]}*@${domain}`;
    return `${user[0]}${'*'.repeat(Math.min(user.length - 2, 4))}${user[user.length - 1]}@${domain}`;
  }

  // API Endpoint: Forgot Password - Request 6-digit Email OTP
  if (reqUrl === '/api/auth/forgot-password' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { identifier } = JSON.parse(body || '{}');
        if (!identifier || !identifier.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Please enter User ID or Email' }));
        }

        const cleanId = identifier.trim().toLowerCase();
        let dbData = {};
        if (fs.existsSync(DB_FILE)) {
          dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        }

        const employees = dbData.employees || [];
        const emp = employees.find(e => 
          (e.username && e.username.toLowerCase() === cleanId) || 
          (e.email && e.email.toLowerCase() === cleanId)
        );

        if (!emp) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'User ID or Email not found in CRM database.' }));
        }

        const userEmail = emp.email || 'sabir@momai.com';
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        otpStore.set(emp.username.toLowerCase(), {
          otp,
          expiresAt,
          empId: emp.id,
          email: userEmail,
          name: emp.name
        });

        console.log(`\n========================================`);
        console.log(`🔐 [MOMAI CRM] PASSWORD RESET REQUEST`);
        console.log(`User: ${emp.name} (${emp.username}) | Role: ${emp.role}`);
        console.log(`Target Email: ${userEmail}`);
        console.log(`Generated OTP: ${otp} (Valid 10 mins)`);
        console.log(`========================================\n`);

        const masked = maskEmail(userEmail);
        const smtp = dbData.smtpSettings;
        let sentRealEmail = false;

        // If real SMTP is configured, attempt sending via nodemailer
        if (smtp && smtp.user && smtp.pass) {
          try {
            const transporter = nodemailer.createTransport({
              host: smtp.host || 'smtp.gmail.com',
              port: parseInt(smtp.port, 10) || 587,
              secure: !!smtp.secure,
              auth: {
                user: smtp.user,
                pass: smtp.pass
              }
            });

            await transporter.sendMail({
              from: smtp.from || `"Momai Enterprise CRM" <${smtp.user}>`,
              to: userEmail,
              subject: `🔐 Your Momai CRM Password Reset Code: ${otp}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                  <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #0f172a; margin: 0;">Momai Enterprise CRM</h2>
                    <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Drive Secure. We Remind.</p>
                  </div>
                  <p style="color: #334155; font-size: 14px;">Hello <strong>${emp.name}</strong>,</p>
                  <p style="color: #334155; font-size: 14px;">You requested a password reset for your CRM portal account (User ID: <strong>${emp.username}</strong>).</p>
                  <div style="text-align: center; background: #f8fafc; border: 1.5px dashed #cbd5e1; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Your 6-Digit Verification Code</div>
                    <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4f46e5;">${otp}</div>
                    <div style="font-size: 12px; color: #dc2626; margin-top: 6px;">⏱️ Expires in 10 minutes</div>
                  </div>
                  <p style="color: #64748b; font-size: 12px;">If you did not request this, please contact Sabir Ajmeri (+91 99250 23570) immediately.</p>
                  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                  <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">Momai Enterprise • Automotive Document Reminder CRM</p>
                </div>
              `
            });
            sentRealEmail = true;
          } catch (mailErr) {
            console.warn('[SMTP Error] Failed to send live email, falling back to instant preview mode:', mailErr.message);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          email: masked,
          username: emp.username,
          sentRealEmail: sentRealEmail,
          demoOtp: sentRealEmail ? undefined : otp,
          message: sentRealEmail 
            ? `Verification code has been sent to ${masked}` 
            : `Verification code sent to ${masked}! (Test mode code: ${otp})`
        }));
      } catch (err) {
        console.error('Error in forgot-password:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Reset Password - Verify OTP & Set New Password
  if (reqUrl === '/api/auth/reset-password' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { identifier, otp, newPassword } = JSON.parse(body || '{}');
        if (!identifier || !otp || !newPassword) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'All fields are required.' }));
        }

        if (newPassword.length < 4) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Password must be at least 4 characters long.' }));
        }

        const cleanId = identifier.trim().toLowerCase();
        const storedRecord = otpStore.get(cleanId);

        if (!storedRecord) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'No active OTP request found. Please request a new code.' }));
        }

        if (Date.now() > storedRecord.expiresAt) {
          otpStore.delete(cleanId);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'OTP has expired. Please request a new code.' }));
        }

        if (storedRecord.otp.trim() !== String(otp).trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Invalid verification code. Please check and try again.' }));
        }

        // OTP is valid! Update database.json
        let dbData = {};
        if (fs.existsSync(DB_FILE)) {
          dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        }

        const employees = dbData.employees || [];
        const emp = employees.find(e => e.id === storedRecord.empId);
        if (!emp) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Employee account not found.' }));
        }

        emp.password = newPassword.trim();

        // Save updated database.json
        const jsonStr = JSON.stringify(dbData, null, 2);
        fs.writeFileSync(DB_FILE, jsonStr, 'utf8');

        // Backup
        const todayStr = new Date().toISOString().slice(0, 10);
        fs.writeFileSync(path.join(BACKUPS_DIR, `backup_${todayStr}.json`), jsonStr, 'utf8');

        // Clear OTP
        otpStore.delete(cleanId);

        console.log(`✅ Password successfully updated for ${emp.name} (${emp.username})`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          username: emp.username,
          message: 'Password reset successfully! You can now log in.' 
        }));
      } catch (err) {
        console.error('Error in reset-password:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Get Database
  if (reqUrl === '/api/data' && req.method === 'GET') {
    if (fs.existsSync(DB_FILE)) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      const stream = fs.createReadStream(DB_FILE);
      stream.pipe(res);
      return;
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ found: false }));
      return;
    }
  }

  // Static File Serving
  if (reqUrl === '/') {
    reqUrl = '/index.html';
  }

  const filePath = path.normalize(path.join(PUBLIC_DIR, reqUrl));

  // Security check: ensure path is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Momai Enterprise CRM Server running at http://localhost:${PORT}/`);
});
