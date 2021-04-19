const url = "https://fcm.googleapis.com/fcm/send";

const call = async (token, user, room) => {
  const payload = {
    to: token,
    notification: {
      title: user,
      body: room,
    },
  };

  const res = await fetch(url, {
    method: "POST", 
    headers: {
      Authorization: "key=" + firebaseServerkey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // body data type must match "Content-Type" header
  });

  return res;
};
