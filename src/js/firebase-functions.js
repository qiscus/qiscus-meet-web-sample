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
    isValidCall(
      Notification.permission,
      payload.notification.title,
      notificationOption.roomName
    )
  ) {
    let isAnswered;

    if (notificationOption.roomName === END_CALL) {
      destroyCall();
    } else {
      isAnswered = confirm(payload.notification.title + " is calling you");
      // Triggered when targeted user answered the call
      if (isAnswered) {
        setTimeout(async () => {
          startCall();
          const roomName = notificationOption.roomName.split("/")[1];
          const room = notificationOption.roomName;
          const data = getData(userName, roomName);
          const options = await getOptions(data, userName, room);

          api = await new QiscusMeetExternalAPI(domain, options);

          // Triggered when user end the call
          await endCallCallback(api);
        }, 3000);
      } else {
        // Trigger FCM when targeted user rejected the call
        await notify(token, userName, REJECT_CALL);
      }
    }
  } else {
    destroyCall();
  }
});

messaging.onTokenRefresh(async () => {
  const result = await messaging.getToken();

  console.log("New Token:" + result);
});

IntitalizeFireBaseMessaging();
