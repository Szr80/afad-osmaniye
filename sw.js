importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js');

const firebaseConfig = {
    databaseURL: "https://ana-uygulama-f22cb-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Arka planda vaka dinleme
db.ref('ortakKanal').on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data && data.metin && data.metin !== "VAKA BEKLENİYOR...") {
        self.registration.showNotification('🚨 1 YENİ VAKA VAR!', {
            body: data.metin, // Admin'in yazdığı vaka detayı
            icon: 'https://upload.wikimedia.org/wikipedia/tr/e/ee/Afet_ve_Acil_Durum_Y%C3%B6netimi_Ba%C5%9Fanl%C4%B1%C4%9F%C4%B1_logosu.png',
            vibrate: [500, 200, 500, 200, 500],
            tag: 'vaka-bildirim',
            renotify: true,
            requireInteraction: true // Kullanıcı tıklayana kadar bildirim gitmez
        });
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
