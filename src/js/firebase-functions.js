firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const IntitalizeFireBaseMessaging = async () => {
  await messaging.requestPermission();
  const result = await messaging.getToken();
  token = await result;
};

// Listening for FCM
messaging.onMessage(async (payload) => {
  const notificationOption = {
    roomName: payload.notification.body,
  };

  // Check call attributes request
  if (
    isValid(
      Notification.permission,
      payload.notification.title,
      notificationOption.roomName
    )
  ) {
    const isAnswered = confirm(payload.notification.title + " is calling you");

    // Trigger when target user answered the call
    if (isAnswered) {
      setTimeout(async () => {
        callForm.style.display = HIDE;
        meet.style.display = SHOW;

        options.roomName = notificationOption.roomName;
        api = new QiscusMeetExternalAPI(domain, await options);
      }, 3000);
    }
    // Trigger FCM when targeted user rejected the call
    else {
      await call(token, userName, REJECT_CALL);
    }
    // Close meet after target user declined the call
  } else {
    meet.style.display = HIDE;
    callForm.style.display = SHOW;
  }
});

messaging.onTokenRefresh(async () => {
  const result = await messaging.getToken();
  console.log("New Token:" + result);
});

IntitalizeFireBaseMessaging();
