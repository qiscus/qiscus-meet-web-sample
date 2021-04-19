const url = "https://fcm.googleapis.com/fcm/send";

// Trigger FCM when calling other user
const call = async (token, user, room) => {
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
const isValid = (permission, callerName, status) => {
  return permission === GRANT_CALL &&
    callerName !== userName &&
    status !== REJECT_CALL
    ? true
    : false;
};
