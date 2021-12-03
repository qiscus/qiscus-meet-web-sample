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
      userName,
      Notification.permission,
      payload.notification.title,
      notificationOption.roomName
    )
  ) {
    if (notificationOption.roomName === END_CALL) {
      destroyCall("Call ended");
    } else {
      $("#modal").modal("show");
      $("#modal-body")
        .empty()
        .append("<p>" + payload.notification.title + " is calling...</p>");

      // Triggered when targeted user answered the call
      $("#accept-call").click(async () => {
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
      });

      // Trigger FCM when targeted user rejected the call
      $("#reject-call").click(async () => {
        await notify(token, userName, REJECT_CALL);
        destroyCall("Call rejected");
      });
    }
  } else if (payload.notification.title == userName && status != REJECT_CALL) {
    setTimeout(async () => {
      startCall();
    }, 3000);
  } else {
    destroyCall("Call ended");
  }
});

messaging.onTokenRefresh(async () => {
  const result = await messaging.getToken();

  console.log("New Token:" + result);
});

IntitalizeFireBaseMessaging();
