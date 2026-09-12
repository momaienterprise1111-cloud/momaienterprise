// Momai Enterprise CRM - Cloudflare Worker Backend
// Connects to RESTful Master Cloud Database & Delivers Static Assets

const CLOUD_MASTER_URL = 'https://api.restful-api.dev/objects/ff808181a067127101a096ac7835033a';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    };

    // Preflight CORS handler
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Real-Time Cross-Device Data Sync API (/api/data or /api/sync)
    if (url.pathname === '/api/data' || url.pathname === '/api/sync') {
      // 1. POST / PUT: Save customer data, passwords, and records to persistent cloud store
      if (request.method === 'POST' || request.method === 'PUT') {
        try {
          const body = await request.json();
          const version = (body.data && body.data.version) || body.version || Date.now();
          const payload = {
            name: 'Momai_CRM_Master_DB',
            data: body.data || body
          };

          const cloudRes = await fetch(CLOUD_MASTER_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          return new Response(JSON.stringify({
            success: true,
            version: version,
            count: (payload.data && payload.data.callingList) ? payload.data.callingList.length : 0,
            message: 'Data successfully synchronized across all laptops & devices'
          }), { headers: corsHeaders });
        } catch (err) {
          return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400, headers: corsHeaders });
        }
      }

      // 2. GET: Read latest data from persistent cloud store
      try {
        const cloudRes = await fetch(CLOUD_MASTER_URL + '?t=' + Date.now(), { cache: 'no-store' });
        if (cloudRes.ok) {
          const raw = await cloudRes.json();
          if (raw && raw.data) {
            return new Response(JSON.stringify(raw.data), { headers: corsHeaders });
          }
        }
      } catch (cErr) {
        console.warn('Cloud store fetch error:', cErr);
      }

      return new Response(JSON.stringify({
        success: true,
        data: null,
        message: 'No data stored yet in cloud'
      }), { headers: corsHeaders });
    }

    // Health check endpoint
    if (url.pathname === '/api/data/status' || url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'online',
        service: 'Momai Enterprise CRM Live Cloud Engine',
        timestamp: Date.now()
      }), { headers: corsHeaders });
    }

    // Serve static assets from public directory (HTML, CSS, JS, Images)
    return env.ASSETS.fetch(request);
  }
};
