// Karen AI Proxy - Cloudflare Pages Function
// Handles NVIDIA NIM API calls while keeping the API key secret

export async function onRequestPost(context) {
  const { env } = context;

  // Check for API key
  const NVIDIA_API_KEY = env.NVIDIA_API_KEY;
  if (!NVIDIA_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured. Add NVIDIA_API_KEY in Cloudflare Pages settings.' }), {
      status: 500,
      headers: corsHeaders(),
    });
  }

  try {
    const body = await context.request.json();

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: corsHeaders(),
      });
    }

    return new Response(JSON.stringify(data), {
      headers: corsHeaders(),
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
}
