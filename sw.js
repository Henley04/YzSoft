// sw.js
self.addEventListener('fetch', event => {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  event.respondWith(
    fetch(event.request).then(response => {
      // 克隆响应
      const newResponse = new Response(response.body, response);
      
      // 设置Cross-Origin Isolation头
      newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      
      return newResponse;
    }).catch(error => {
      console.error('Fetch failed:', error);
      return fetch(event.request); // 备用方案
    })
  );
});
