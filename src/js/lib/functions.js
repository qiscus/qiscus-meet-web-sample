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
    // Notify other user
    await notify(token, userName, END_CALL);

    destroyCall("Call ended");
  });

  // Trigger when other user ended the call
  await api.meet.on("participantLeft", () => {
    destroyCall("Call ended");
  });
};

// Show call iframe
const startCall = () => {
  callForm.style.display = HIDE;
  meet.style.display = SHOW;
};

const destroyCall = (msg) => {
  $("#modal").modal("hide");
  $("#modal-notification").modal("show");
  $("#modal-notification-body")
    .empty()
    .append("<p>" + msg + "</p>");

  setTimeout(async () => {
    window.location.href = "/";
  }, 3000);
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
