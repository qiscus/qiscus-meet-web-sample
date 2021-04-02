<?php
function sendCall()
{
    $url = "https://fcm.googleapis.com/fcm/send";

    // Modify according to your firebase server key credential
    $firebaseServerkey = "AAAAiI88BQc:APA91bEtEYY2bUKkNCC1ERADQTCcVXSsA_v1PtBgTZtqilAJzZe0yjQY6Yjfsz98b-EqkkoqYUOe4qFaxOlbHZFV_i_dq2F2eqsg5vdifhi_XZO46-NXQcy3B7ddlMJiblGpEWMOTigC";

    $fields = array(
        "to" => $_REQUEST['token'],
        "notification" => array(
            "title" => $_REQUEST['user'],
            "body" => $_REQUEST['room']
        )
    );

    $headers = array(
        'Authorization: key=' . $firebaseServerkey,
        'Content-Type:application/json'
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    curl_exec($ch);
    curl_close($ch);
}

sendCall();
