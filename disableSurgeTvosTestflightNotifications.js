let body = JSON.parse($request.body);
body.platformUpdates.appletvos.emailEnabled = false;
body.platformUpdates.appletvos.pushEnabled = false;
$done({body: JSON.stringify(body)})
