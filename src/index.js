let globalCrmStore = null;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API Route for Cross-Device Synchronization
    if (url.pathname === '/api/data' || url.pathname === '/api/sync') {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      if (request.method === 'POST' || request.method === 'PUT') {
        try {
          const body = await request.json();
          globalCrmStore = body;
          return new Response(JSON.stringify({ 
            success: true, 
            version: body.version || Date.now(),
            count: body.data && body.data.callingList ? body.data.callingList.length : 0 
          }), { headers: corsHeaders });
        } catch (err) {
          return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400, headers: corsHeaders });
        }
      }

      // GET
      if (globalCrmStore && globalCrmStore.data) {
        return new Response(JSON.stringify(globalCrmStore), { headers: corsHeaders });
      }
      return new Response(JSON.stringify({ success: true, data: null, message: "No data stored yet" }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/data/status') {
      return new Response(JSON.stringify({ status: 'online', timestamp: Date.now() }), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};

