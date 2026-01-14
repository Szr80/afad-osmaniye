// sw.js - Kesintisiz Arka Plan ve Otomatik Tetikleme Motoru
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'ACİL: Yeni AFAD vaka kaydı düşmüştür!',
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 110, 500, 110, 500, 110, 500],
        requireInteraction: true,
        tag: 'afad-vaka-kesin',
        renotify: true,
        priority: 'high'
    };

    event.waitUntil(
        self.registration.showNotification('🚨 OSMANİYE AFAD', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('/');
        })
    );
});
