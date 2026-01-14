// sw.js - Arka Plan Servisi
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('push', function(event) {
    const title = 'YENİ AFAD VAKASI!';
    const options = {
        body: event.data ? event.data.text() : 'Yeni bir vaka kaydı düşmüştür.',
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 200, 500],
        requireInteraction: true
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
