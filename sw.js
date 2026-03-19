// sw.js - Osmaniye AFAD Arka Plan Servisi
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

// Arka planda vaka bildirimi geldiğinde çalışır
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: "AFAD BİLDİRİM", body: "Yeni bir görev emri var!" };
    
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 200, 500, 200, 500],
        requireInteraction: true, // Kullanıcı kapatana kadar ekranda kalır
        tag: 'vaka-uyari'
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Bildirime tıklandığında uygulamayı açar
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
