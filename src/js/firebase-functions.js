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
    let isAnswered;
    if (notificationOption.roomName === END_CALL) {
      callForm.style.display = SHOW;
      meet.style.display = HIDE;
    } else {
      isAnswered = confirm(payload.notification.title + " is calling you");
    }

    // Trigger when targeted user answered the call
    if (isAnswered) {
      setTimeout(async () => {
        callForm.style.display = HIDE;
        meet.style.display = SHOW;
        const data = {
          avatar: "",
          name: userName,
          email: "sample-meet@qiscus.com",
          appId: appId,
          room: notificationOption.roomName.split("/")[1],
          moderator: true,
        };
        core = new QiscusMeetCoreAPI();
        options = core.getJWT(data).then((res) => {
          return {
            roomName: notificationOption.roomName,
            parentNode: document.querySelector("#meet"),
            configOverwrite: {
              startWithAudioMuted: true,
              startWithVideoMuted: true,
            },
            interfaceConfigOverwrite: {
              TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"],
              VIDEO_LAYOUT_FIT: "both",
              DEFAULT_REMOTE_DISPLAY_NAME: "Guest",
              DISPLAY_WELCOME_PAGE_CONTENT: false,
              APP_NAME: "Qiscus",
              NATIVE_APP_NAME: "Qiscus",
              PROVIDER_NAME: "Qiscus",
            },
            userInfo: {
              email: "email@jitsiexamplemail.com",
              displayName: userName,
            },
            jwt: res.token,
          };
        });
        api = await new QiscusMeetExternalAPI(domain, await options);
        // Qiscus API for endcall
        await api.meet.on("videoConferenceLeft", async (data) => {
          console.log("you ended the call");
          await call(token, userName, END_CALL);
          window.location.href = "/";
        });

        await api.meet.on("participantLeft", async (data) => {
          console.log("call ended by other user");
          window.location.href = "/";
        });
      }, 3000);
    }
    // Trigger FCM when targeted user rejected the call
    else {
      await call(token, userName, REJECT_CALL);
    }
  }
});

messaging.onTokenRefresh(async () => {
  const result = await messaging.getToken();
  console.log("New Token:" + result);
});

IntitalizeFireBaseMessaging();
