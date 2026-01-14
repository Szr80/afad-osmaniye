self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'https://upload.wikimedia.org/wikipedia/tr/e/ee/Afet_ve_Acil_Durum_Y%C3%B6netimi_Ba%C5%9Fanl%C4%B1%C4%9F%C4%B1_logosu.png',
        vibrate: [500, 200, 500],
        tag: 'afad-vaka-uyari'
    };
    event.waitUntil(self.registration.showNotification('AFAD VAKA SİSTEMİ', options));
});
