self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
self.addEventListener('push', (e) => {
    const data = e.data ? e.data.json() : { title: 'AFAD', body: 'Yeni Vaka!' };
    e.waitUntil(self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        requireInteraction: true,
        vibrate: [500, 200, 500]
    }));
});
