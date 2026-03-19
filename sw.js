// sw.js
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'AFAD GÖREV', body: 'Yeni vaka bildirimi!' };
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 250, 500, 250, 500],
        requireInteraction: true, // ÖNEMLİ: Kullanıcı dokunana kadar gitmez
        data: { url: '/' }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(cl => {
            if (cl.length > 0) return cl[0].focus();
            return clients.openWindow('/');
        })
    );
});
