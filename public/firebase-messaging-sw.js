importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAP7zTp1JSOBAc4nakEpJWryADEr4jmdF4",
  authDomain: "basketball-app-caba1.firebaseapp.com",
  projectId: "basketball-app-caba1",
  storageBucket: "basketball-app-caba1.firebasestorage.app",
  messagingSenderId: "358028624503",
  appId: "1:358028624503:web:72134a7994b2040852fc72",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192.png",
  });
});