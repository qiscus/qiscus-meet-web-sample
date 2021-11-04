const url = "https://fcm.googleapis.com/fcm/send";

// Trigger FCM when calling other user
const notify = async (token, user, room) => {
  const payload = {
    to: token,
    notification: {
      title: user,
      body: room,
    },
  };

  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "key=" + firebaseServerkey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return result;
};

// Call validation
const isValidCall = (userName, permission, callerName, status) => {
  return permission == GRANT_CALL &&
    callerName != userName &&
    status != REJECT_CALL
    ? true
    : false;
};

const endCallCallback = async (api) => {
  // Trigger when user ended the call
  await api.meet.on("videoConferenceLeft", async () => {
    console.log("you ended the call");

    // Notify other user
    await notify(token, userName, END_CALL);

    window.location.href = "/";
  });

  // Trigger when other user ended the call
  await api.meet.on("participantLeft", () => {
    console.log("call ended by other user");

    window.location.href = "/";
  });
};

// Show call iframe
const startCall = () => {
  callForm.style.display = HIDE;
  meet.style.display = SHOW;
};

// Hide call iframe
const destroyCall = () => {
  callForm.style.display = SHOW;
  meet.style.display = HIDE;
};

const getOptions = async (data, userName, roomName) => {
  const core = new QiscusMeetCoreAPI();

  return core.getJWT(data).then((res) => {
    return {
      roomName: roomName,
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
};
const getData = (userName, roomName) => {
  const data = {
    avatar: "",
    name: userName,
    email: "sample-meet@qiscus.com",
    appId: appId,
    room: roomName,
    moderator: true,
  };

  return data;
};
