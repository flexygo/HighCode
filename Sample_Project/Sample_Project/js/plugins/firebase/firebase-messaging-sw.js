// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup

importScripts('./firebase-app.js');
importScripts('./firebase-messaging.js');
importScripts('./firebase-init.js');

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (nT) {
    debugger;
  console.log('[firebase-messaging-sw.js] Received background message ', nT.data);
  // Customize notification here
  const notificationOptions = { 
      body: nT.data.body,
      icon: '../../../img/icons/icon-128x128.png',
      data: nT
  };

  return self.registration.showNotification(nT.data.title,
    notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    debugger;
    //let url = 'https://example.com/some-path/';
    event.notification.close(); // Android needs explicit close.
    /*event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );*/
});
// [END background_handler]
