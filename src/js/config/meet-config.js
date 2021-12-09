// Generate random user and room name
const userName = (document.getElementById(
  "userName"
).value = Math.random().toString(36).substring(2, 7));
const roomName = (document.getElementById(
  "roomName"
).value = Math.random().toString(36).substring(2, 7));

// Qiscus Meet Config
const domain = "call.qiscus.com";
const appId = "meetstage-iec22sd";
