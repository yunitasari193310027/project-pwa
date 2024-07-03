// /sw.js
self.addEventListener('install', (event) => {
    const cacheKey = 'MyFancyCacheName_v1';
  
    event.waitUntil(caches.open(cacheKey).then((cache) => {
      // Add all the assets in the array to the 'MyFancyCacheName_v1'
      // `Cache` instance for later use.
      return cache.addAll([
        '/css/global.bc7b80b7.css',
        '/css/home.fe5d0b23.css',
        '/js/home.d3cc4ba4.js',
        '/js/jquery.43ca4933.js'
      ]);
    }));
  });

  // /sw.js
self.addEventListener('install', (event) => {
    const cacheKey = 'MyFancyCacheName_v1';
  
    event.waitUntil(caches.open(cacheKey).then((cache) => {
      // Add all the assets in the array to the 'MyFancyCacheName_v1'
      // `Cache` instance for later use.
      return cache.addAll([
        '/',
        '/css/main.css',
        '/js/jquery.min.js',
        '/js/main.js',
        '/image/logo.png'
      ]);
    }));
  });

  self.addEventListener('activate', (event) => {
    // Specify allowed cache keys
    const cacheAllowList = ['MyFancyCacheName_v1'];
  
    // Get all the currently active `Cache` instances.
    event.waitUntil(caches.keys().then((keys) => {
      // Delete all caches that aren't in the allow list:
      return Promise.all(keys.map((key) => {
        if (!cacheAllowList.includes(key)) {
          return caches.delete(key);
        }
      }));
    }));
  });

  // Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName));
});

self.addEventListener('fetch', async (event) => {
  // Is this a request for an image?
  if (event.request.destination === 'image') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Respond with the image from the cache or from the network
      return cache.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
          // Add the network response to the cache for future visits.
          // Note: we need to make a copy of the response to save it in
          // the cache and use the original as the request response.
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});