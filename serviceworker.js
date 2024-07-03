const cacheName = 'MyFancyCacheName_v1';

// Pada saat instalasi, tambahkan asset yang ingin Anda cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        '/css/main.css',
        '/js/jquery.min.js',
        '/js/main.js',
        '/image/logo.png'
        // Tambahkan asset lainnya yang ingin Anda cache di sini
      ]);
    })
  );
});

// Saat service worker diaktifkan, bersihkan cache yang tidak diperlukan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Ketika halaman melakukan fetch, coba ambil dari cache terlebih dahulu
// Jika tidak ada di cache, ambil dari jaringan dan simpan di cache untuk penggunaan selanjutnya
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Jika ada respons di cache, kembalikan dari cache
      if (cachedResponse) {
        return cachedResponse;
      }

      // Jika tidak ada di cache, ambil dari jaringan
      return fetch(event.request).then((networkResponse) => {
        // Saat mengambil dari jaringan, tambahkan respons ke cache
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Jika gagal mengambil dari jaringan dan tidak ada di cache, tampilkan pesan offline
        return new Response('Halaman tidak tersedia', {
          status: 404,
          statusText: 'Not Found',
        });
      });
    })
  );
});
