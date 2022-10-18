// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.

const CACHE_VERSION = 4;
const CURRENT_CACHES = {
    precache: 'tricare-precache-v' + CACHE_VERSION,
    runtime: 'tricare-runtime-v' + CACHE_VERSION
};

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    '/_inc/js/src/HomePageMain.js'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }
    event.waitUntil(
        caches.open(CURRENT_CACHES['precache'])
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = Object.keys(CURRENT_CACHES).map(function (key) {
        return CURRENT_CACHES[key];
    });
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }
    //console.log('fetch');
    // Skip cross-origin requests, like those for Google Analytics.
    if (!event.request.url.startsWith(self.location.origin)) {
        //console.log(event.request.url);
        //console.log(self.location.origin);
        return;

    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            //Item wasn't cached, so do a network request and check if it should be cached
            return caches.open(CURRENT_CACHES['runtime']).then(cache => {
                return fetch(event.request.clone()).then(response => {
                    if (response.status < 400 &&
                        response.headers.has('content-type') &&
                        (
                            response.headers.get('content-type').match(/^image\//i) ||
                            response.headers.get('content-type').match(/^javascript\//i)
                        ))
                    {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    }
                    //console.log(response.headers.get('content-type'))
                    return response;
                });
            });
        })
    );
});