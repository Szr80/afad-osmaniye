const CACHE_NAME = 'vaka80-v1';
const assets = ['./index.html', './manifest.json'];

// Yükleme sırasında dosyaları önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Firebase Bildirimleri ve Veri Dinleme
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js');

const firebaseConfig = { databaseURL: "https://ana-uygulama-f22cb-default-rtdb.asia-southeast1.firebasedatabase.app/" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

db.ref('ortakKanal').on('value', (snapshot) => {
  const data = snapshot.val();
  if (data && data.metin && data.metin !== "KOMUTA BEKLENİYOR...") {
    self.registration.showNotification('🚨 YENİ VAKA!', {
      body: data.metin,
      icon: 'https://upload.wikimedia.org/wikipedia/tr/e/ee/Afet_ve_Acil_Durum_Y%C3%B6netimi_Ba%C5%9Fanl%C4%B1%C4%9F%C4%B1_logosu.png',
      vibrate: [500, 200, 500],
      tag: 'vaka-bildirim',
      renotify: true
    });
  }
});
