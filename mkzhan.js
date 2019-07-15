let body = JSON.parse($response.body);

body.data.gold = "999";
body.data.ticket = "999";
body.data.is_vip = "1";
body.data.integral = "999";
body.data.card_count = "999";
body.data.vip_end_time = "1599999999";

body = JSON.stringify(body);

$done({body});


