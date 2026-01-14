// sw.js
self.addEventListener('push', function(event) {
    const title = 'YENİ AFAD VAKASI!';
    const options = {
        body: event.data ? event.data.text() : 'Acil vaka kaydı düşmüştür.',
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 200, 500, 200, 500], // Titreşimle destekle
        requireInteraction: true, // Kullanıcı kapatana kadar ekranda kalır
        tag: 'afad-vaka' // Bildirimlerin üst üste binmesini engeller
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // Bildirime tıklayınca uygulamayı açar
    );
});
