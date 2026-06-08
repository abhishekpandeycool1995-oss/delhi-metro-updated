const CACHE = 'delhi-metro-v1';
const URLS = ['index.html', 'manifest.json', 'icons/icon-192.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const c = res.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, c));
      return res;
    }))
  );
});
