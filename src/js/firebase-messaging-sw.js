importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);
importScripts(
  "./config/firebase-config.js"
);

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
