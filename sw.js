importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js');

const firebaseConfig = { 
    databaseURL: "https://ana-uygulama-f22cb-default-rtdb.asia-southeast1.firebasedatabase.app/" 
};

firebase.initializeApp(firebaseConfig);

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

// ARKA PLAN DİNLEME
firebase.database().ref('ortakKanal').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data && data.metin && data.metin !== "KOMUTA BEKLENİYOR...") {
        self.registration.showNotification('🚨 OSMANİYE AFAD: YENİ VAKA', {
            body: data.metin,
            icon: 'https://upload.wikimedia.org/wikipedia/tr/e/ee/Afet_ve_Acil_Durum_Y%C3%B6netimi_Ba%C5%9Fanl%C4%B1%C4%9F%C4%B1_logosu.png',
            badge: 'https://upload.wikimedia.org/wikipedia/tr/e/ee/Afet_ve_Acil_Durum_Y%C3%B6netimi_Ba%C5%9Fanl%C4%B1%C4%9F%C4%B1_logosu.png',
            vibrate: [500, 200, 500, 200, 500],
            tag: 'vaka-bildirim',
            renotify: true,
            requireInteraction: true // Kullanıcı kapatana kadar bildirim ekranda kalsın
        });
    }
});

// Bildirime tıklandığında uygulamayı aç
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('./');
        })
    );
});
