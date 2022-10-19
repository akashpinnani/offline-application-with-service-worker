# About Service Worker
Service worker has 3 states. Registration, Installation and Activation

We can register service worker file in **registration** state. We can do this in javascript file where we can mention path of the service worker file.

> **User might observe in network tab that each request has a duplicate request preceeded with gear icon. This is due to service worker makes additional request using fetch api and intercepts each request. After getting response we can cache it using *caches* api**<img width="1019" alt="Screen Shot 2022-10-19 at 4 19 42 PM" src="https://user-images.githubusercontent.com/18011044/196806627-26458676-f55b-4bef-80d4-85ac85d1d351.png">

On initial load browser will register service worker. On 2nd load, fetch event listener will be attached by service worker. **So it requires 2 times to load initially to cache the requests**
