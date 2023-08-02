if (!$request.body) $done({});
let body = JSON.parse($request.body);
body.platformUpdates.appletvos.emailEnabled = false;
body.platformUpdates.appletvos.pushEnabled = false;
$notification.post("","已禁用通知","请删除本模块")；
$done({body: JSON.stringify(body)})
