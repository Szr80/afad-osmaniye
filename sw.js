const CACHE_NAME = 'afad-v1';
const ASSETS = ['./', './index.html', 'https://cdn-icons-png.flaticon.com/512/564/564619.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Arka planda konum ve mesaj trafiğini canlı tutmak için periyodik kontrol
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'konum-tazele') {
    console.log('Arka plan verisi tazelendi');
  }
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});