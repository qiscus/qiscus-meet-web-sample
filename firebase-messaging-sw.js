importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);

// Firebase Config (modify according to your firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAWxEmVCkZ2GbcV4eHxIFGJheAYcraERak",
  authDomain: "meetweb-sample.firebaseapp.com",
  projectId: "meetweb-sample",
  storageBucket: "meetweb-sample.appspot.com",
  messagingSenderId: "586518627591",
  appId: "1:586518627591:web:b07067ead19fd328c371a2",
  measurementId: "G-1W9RFTHYL5",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const notification = JSON.parse(payload);
  const notificationOption = {
    body: notification.body,
  };
  return self.registration.showNotification(
    payload.notification.title,
    notificationOption
  );
});
