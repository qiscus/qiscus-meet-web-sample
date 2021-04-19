firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const IntitalizeFireBaseMessaging = async () => {
  await messaging.requestPermission();
  const res = await messaging.getToken();
  token = await res;
};

// Calling validation
const isCalling = (permission, callerName, status) => {
  return permission === "granted" &&
    callerName !== userName &&
    status !== "reject"
    ? true
    : false;
};

// Listening for FCM
messaging.onMessage(async (payload) => {
  const notificationOption = {
    roomName: payload.notification.body,
  };

  // Check call attributes request
  if (
    isCalling(
      Notification.permission,
      payload.notification.title,
      notificationOption.roomName
    )
  ) {
    const isAnswered = confirm(payload.notification.title + " is calling you");

    // Trigger when target user answered the call
    if (isAnswered) {
      setTimeout(async () => {
        callForm.style.display = "none";
        meet.style.display = "block";

        options.roomName = notificationOption.roomName;
        api = new QiscusMeetExternalAPI(domain, await options);
      }, 3000);
    }
    // Trigger FCM when targeted user rejected the call
    else {
      const REJECT_CALL = "reject";
      await call(token, userName, REJECT_CALL);
    }
    // Close meet after target user declined the call
  } else {
    meet.style.display = "none";
    callForm.style.display = "block";
  }
});

messaging.onTokenRefresh(async () => {
  const res = await messaging.getToken();
  console.log("New Token:" + res);
});

IntitalizeFireBaseMessaging();
