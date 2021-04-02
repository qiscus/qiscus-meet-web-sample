// Generate random user and room name
const userName = (document.getElementById(
  "userName"
).value = Math.random().toString(36).substring(2, 7));
const roomName = (document.getElementById(
  "roomName"
).value = Math.random().toString(36).substring(2, 7));

// Qiscus Meet Config
var room = roomName;
var domain = "call.qiscus.com";
var data = {
  avatar: "",
  name: userName,
  email: "sample@mail.com",
  appId: "meetstage-iec22sd",
  moderator: false,
};
var options = {
  roomName: room,
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
};
