// Generate random user and room name
const userName = (document.getElementById(
  "userName"
).value = Math.random().toString(36).substring(2, 7));
const roomName = (document.getElementById(
  "roomName"
).value = Math.random().toString(36).substring(2, 7));

// Qiscus Meet Config
const domain = "call.qiscus.com";
const appId = "your-app-id";
const data = {
  avatar: "",
  name: userName,
  email: "sample-meet@qiscus.com",
  appId: appId,
  room: roomName,
  moderator: true,
};
let core = new QiscusMeetCoreAPI();
let options = core.getJWT(data).then((res) => {
  return {
    roomName: appId + "/" + roomName,
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
