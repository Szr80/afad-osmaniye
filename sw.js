// sw.js - Arka Plan Bildirim Motoru
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.text() : 'Yeni AFAD Vakası Alındı!';
    const options = {
        body: data,
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 200, 500],
        requireInteraction: true // Kullanıcı tıklayana kadar bildirim ekranda kalır
    };
    event.waitUntil(self.registration.showNotification('OSMANİYE AFAD', options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/')); // Bildirime tıklayınca uygulamayı açar
});
