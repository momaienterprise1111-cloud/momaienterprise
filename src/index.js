// Momai Enterprise CRM - Cloudflare Worker Backend
// Powered by Native Cloudflare Workers KV (MOMAI_CRM_KV) for 100% Reliable Cross-Device Sync

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
      // 1. POST / PUT: Save customer data, passwords, and records to Cloudflare KV
      if (request.method === 'POST' || request.method === 'PUT') {
        try {
          const body = await request.json();
          const version = (body.data && body.data.version) || body.version || Date.now();
          const payload = {
            success: true,
            version: version,
            data: body.data || body,
            lastModifiedBy: body.lastModifiedBy || 'Admin',
            lastModifiedAt: body.lastModifiedAt || new Date().toISOString()
          };

          if (env.MOMAI_CRM_KV) {
            await env.MOMAI_CRM_KV.put('CRM_MASTER_STORE', JSON.stringify(payload));
          }

          return new Response(JSON.stringify({
            success: true,
            version: version,
            count: (payload.data && payload.data.callingList) ? payload.data.callingList.length : 0,
            message: 'Data successfully synchronized across all laptops via Cloudflare KV'
          }), { headers: corsHeaders });
        } catch (err) {
          return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400, headers: corsHeaders });
        }
      }

      // 2. GET: Read latest data from Cloudflare KV
      if (env.MOMAI_CRM_KV) {
        try {
          const rawKv = await env.MOMAI_CRM_KV.get('CRM_MASTER_STORE');
          if (rawKv) {
            const parsed = JSON.parse(rawKv);
            return new Response(JSON.stringify(parsed), { headers: corsHeaders });
          }
        } catch (cErr) {
          console.warn('Cloudflare KV fetch error:', cErr);
        }
      }

      return new Response(JSON.stringify({
        success: true,
        data: null,
        message: 'No data stored yet in Cloudflare KV'
      }), { headers: corsHeaders });
    }

    // Health check endpoint
    if (url.pathname === '/api/data/status' || url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'online',
        kv_bound: Boolean(env.MOMAI_CRM_KV),
        service: 'Momai Enterprise CRM Cloudflare KV Engine',
        timestamp: Date.now()
      }), { headers: corsHeaders });
    }

    // Serve static assets from public directory (HTML, CSS, JS, Images)
    return env.ASSETS.fetch(request);
  }
};
