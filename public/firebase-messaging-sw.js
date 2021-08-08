// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js')


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}
  
// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyANSyKlmSsngY8RIpKQ4pZxNy7JIEkCUEI",
  authDomain: "push-notification-430da.firebaseapp.com",
  projectId: "push-notification-430da",
  storageBucket: "push-notification-430da.appspot.com",
  messagingSenderId: "618709941132",
  appId: "1:618709941132:web:deef5e0f880baba3acb4a9",
};

firebase.initializeApp(firebaseConfig);

const message = firebase.messaging()
