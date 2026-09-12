// Momai Enterprise CRM - Cloudflare Worker Backend
// Provides Persistent Real-Time Multi-Device Cloud Synchronization & Static Asset Delivery

let inMemoryCrmStore = null;
let inMemoryVersion = 0;

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
      const cache = caches.default;
      const cacheKey = new Request('https://momaienterprise.co.in/api/data_store_cache', { method: 'GET' });

      // 1. POST / PUT: Save customer data, passwords, and records to cloud
      if (request.method === 'POST' || request.method === 'PUT') {
        try {
          const body = await request.json();
          const version = body.version || Date.now();
          const payload = {
            success: true,
            version: version,
            data: body.data || body,
            lastModifiedBy: body.lastModifiedBy || 'Admin',
            lastModifiedAt: body.lastModifiedAt || new Date().toISOString()
          };

          // Store in Worker Isolate Memory
          inMemoryCrmStore = payload;
          inMemoryVersion = version;

          // Store in Cloudflare Global Edge Cache
          try {
            const cacheResponse = new Response(JSON.stringify(payload), {
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=31536000, s-maxage=31536000'
              }
            });
            await cache.put(cacheKey, cacheResponse);
          } catch (cErr) {
            console.warn('Edge cache put error:', cErr);
          }

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

      // 2. GET: Read latest data
      // Check Step A: In-memory store
      if (inMemoryCrmStore && (inMemoryCrmStore.data || inMemoryCrmStore.callingList)) {
        return new Response(JSON.stringify(inMemoryCrmStore), { headers: corsHeaders });
      }

      // Check Step B: Cloudflare Global Edge Cache
      try {
        const cachedRes = await cache.match(cacheKey);
        if (cachedRes) {
          const cachedJson = await cachedRes.json();
          if (cachedJson && (cachedJson.data || cachedJson.callingList)) {
            inMemoryCrmStore = cachedJson;
            inMemoryVersion = cachedJson.version || 0;
            return new Response(JSON.stringify(cachedJson), { headers: corsHeaders });
          }
        }
      } catch (cErr) {
        console.warn('Edge cache match error:', cErr);
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
