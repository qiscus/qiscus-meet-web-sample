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

function IntitalizeFireBaseMessaging() {
  messaging
    .requestPermission()
    .then(function () {
      console.log("Notification Permission");
      return messaging.getToken();
    })
    .then(function (token) {
      // Get token from here
      console.log("Token: " + token);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Listening for FCM
messaging.onMessage(async function (payload) {
  const notificationOption = {
    roomName: payload.notification.body,
  };

  // Check call attributes request
  if (
    Notification.permission === "granted" &&
    payload.notification.title !== userName &&
    notificationOption.roomName !== "reject"
  ) {
    const call = confirm(payload.notification.title + " is calling you");

    // Trigger when target user answered the call
    if (call) {
      setTimeout(function () {
        callForm.style.display = "none";
        meet.style.display = "block";

        options.roomName = notificationOption.roomName;
        var api = new QiscusMeetExternalAPI(domain, options, data);
      }, 3000);
    }
    // Trigger when target user declined the call
    else {
      const url =
        "http://localhost:8080/send_call.php?user=" +
        userName +
        "&room=reject&token=fdYK3UQyrte5eKi9KZqesy:APA91bFFnRsM4QxUmD8Ag9lLb2Xck_RIKwSnkxukc8sp6FwAoZE6Q9nYGNREe3PHQZSzLvk-IfP7CI5vaxHp5g-gpMLmMTy9eSpMmXdgd-sQxhXLKQtDwBBm_hYbefCxeCuxU1uLQArv";
      await fetch(url, {
        method: "get",
      });
    }
    // Close meet after target user declined the call
  } else {
    meet.style.display = "none";
    callForm.style.display = "block";
  }
});

messaging.onTokenRefresh(function () {
  messaging
    .getToken()
    .then(function (newtoken) {
      console.log("New Token : " + newtoken);
    })
    .catch(function (reason) {
      console.log(reason);
    });
});

IntitalizeFireBaseMessaging();
