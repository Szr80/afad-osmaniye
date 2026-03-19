// sw.js
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

// Arka planda bildirim yakalama
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: "AFAD", body: "YENİ GÖREV!" };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
            vibrate: [500, 200, 500],
            requireInteraction: true // Kullanıcı tıklayana kadar gitmez
        })
    );
});

// Arka plan görevleri (Periyodik senkronizasyon için temel yapı)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'konum-guncelle') {
        // Not: Bu özellik tarayıcı desteğine göre çalışır
    }
});
