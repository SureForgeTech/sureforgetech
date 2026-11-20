// The build hook prepends the CSP and baseline headers shared with _headers.
function isHtml(response) {
  return /^text\/html\s*(?:;|$)/i.test(response.headers.get('Content-Type') ?? '');
}

export default {
  async fetch(request, env) {
    let asset = await env.ASSETS.fetch(request);
    if (asset.status === 304) {
      // A previously cached HTML page needs a fresh body and nonce. A 304 may omit its media type.
      const headers = new Headers(request.headers);
      headers.delete('If-None-Match');
      headers.delete('If-Modified-Since');
      const fresh = await env.ASSETS.fetch(new Request(request, { headers }));
      if (!isHtml(fresh)) {
        await fresh.body?.cancel();
        return asset;
      }
      asset = fresh;
    }
    if (!isHtml(asset)) return asset;

    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
    const response = new Response(asset.body, asset);
    for (const [name, value] of Object.entries(securityHeaders)) {
      response.headers.set(name, value);
    }
    response.headers.set('Content-Security-Policy', policy.replace('script-src ', `script-src 'nonce-${nonce}' `));
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.delete('ETag');
    response.headers.delete('Last-Modified');
    return response;
  },
};
