// sw.js - Arka Plan Bildirim ve Hız Motoru (Final Sürüm)

// 1. Servis işçisinin hemen aktif olmasını sağlar (Gecikmeyi önler)
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// 2. Firebase'den veya Sistemden Gelen Bildirimi Yakalama
self.addEventListener('push', function(event) {
    let payload = "Yeni bir AFAD vaka kaydı alındı!";
    
    if (event.data) {
        payload = event.data.text();
    }

    const title = '🚨 YENİ AFAD VAKASI!';
    const options = {
        body: payload,
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
        vibrate: [500, 200, 500, 200, 500, 200, 500], // Güçlü titreşim deseni
        tag: 'vaka-bildirim', // Aynı vakadan defalarca bildirim gelmesini engeller, günceller
        renotify: true, // Yeni veri geldiğinde tekrar titret ve uyandır
        requireInteraction: true, // Sen tıklayana kadar bildirim ekranda asılı kalır
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            { action: 'open', title: 'VAKAYI AÇ' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// 3. Bildirime Tıklandığında Uygulamayı Öne Getirme
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Bildirimi kapat

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            // Eğer uygulama zaten açıksa oraya odaklan
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // Kapalıysa uygulamayı başlat
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
