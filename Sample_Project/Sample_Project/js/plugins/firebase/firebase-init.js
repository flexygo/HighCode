let firebaseConfig = {
    apiKey: "AIzaSyD3QRcNjCNw8WrgsAbBM4MPEcYlq28hLes",
    authDomain: "flexyapp-51271.firebaseapp.com",
    databaseURL: "https://flexyapp-51271.firebaseio.com",
    projectId: "flexyapp-51271",
    storageBucket: "flexyapp-51271.appspot.com",
    messagingSenderId: "496898405652",
    appId: "1:496898405652:web:f4df097e0485e37cee3e01",
    measurementId: "G-0FPDE3VGHN"
};
// Initialize Firebase
if (typeof firebase !== 'undefined') { firebase.initializeApp(firebaseConfig); }

function configureFirebase() {
    if (location.protocol === 'https:') {

        var messaging = firebase.messaging();
        navigator.serviceWorker.register('./js/plugins/firebase/firebase-messaging-sw.js')
            .then((registration) => {

                messaging.useServiceWorker(registration);

                messaging.requestPermission()
                    .then(function () {
                        return messaging.getToken();
                    })
                    .then(function (token) {
                        if (token) {
                            let p = new flexygo.Process('RegisterToken');
                            let params = new Array();
                            params.push({ Key: 'UserId', Value: flexygo.profiles.userid });
                            params.push({ Key: 'DeviceToken', Value: token });
                            params.push({ Key: 'Platform', Value: 'web' });
                            p.showProgress = false;
                            p.run(params, (response) => {
                                if (response) {
                                    if (response.LastException && response.LastException.Message) {
                                        flexygo.msg.error(response.LastException.Message);
                                    } else if (response.WarningMessage) {
                                        flexygo.msg.warning(response.WarningMessage);
                                    }
                                }
                            });

                        } else {
                            console.log('error getting token.');
                        }
                    })
                    .catch(function (err) {
                        console.log('No se ha recibido permiso / token: ', err);
                    });

            });

        messaging.onMessage(function (nT) {
            navigator.serviceWorker.getRegistration('./js/plugins/firebase/firebase-messaging-sw.js').then(registration => {
                const notificationOptions = {
                    body: nT.data.body,
                    icon: './img/icons/icon-128x128.png',
                    data: nT
                };

                registration.showNotification(nT.data.title, notificationOptions);
            });
        });
    }
}