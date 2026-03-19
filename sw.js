const CACHE_NAME = 'afad-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Arka planda vaka bildirimini yakalar
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'AFAD GÖREV', body: 'Yeni vaka bildirimi var!' };
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 200, 500, 200, 500],
        requireInteraction: true,
        data: { url: '/' }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cl) => {
            if (cl.length > 0) return cl[0].focus();
            return clients.openWindow('/');
        })
    );
});
