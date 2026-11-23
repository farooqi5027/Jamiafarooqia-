const CACHE_NAME = "jamia-farooqia-v1";

const FILES_TO_CACHE = [
    "index.html",
    "admissions.html",
    "login.html",
    "admin.html",
    "app-activation.html",
    "student-registration.html",
    "teacher-registration.html",
    "manifest.json"
];


// Install
self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME).then(function(cache) {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});


// Activate
self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys().then(function(names) {

            return Promise.all(

                names.map(function(name) {

                    if(name !== CACHE_NAME){

                        return caches.delete(name);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


// Fetch
self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request).then(function(response) {

            if(response){

                return response;

            }

            return fetch(event.request);

        })

    );

});
