const CACHE_NAME = 'cache-v1';
self.addEventListener('install', (event) => {
    console.log('worker is installed');
 // don't add cache here because worker will install only once and it will never update
});

//after install, check for activate
//here we can delete the old cache if we update our cachename
self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

// caching logic applies here 
// if user is offline, then catch block executes and returns the response from cache or else cache gets added
self.addEventListener("fetch", (fetchEvent) => {
    console.log('fetch event listener added');
    fetchEvent.respondWith(
        fetch(fetchEvent.request).then(res => {
            const cacheRes = res.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(fetchEvent.request, cacheRes));
            return res;
        }).catch(() => caches.match(fetchEvent.request).then(res => res))
    );
  });
