let buy = "comic.mkzcdn.com/chapter/buy/add/"
let info = "member.mkzcdn.com/user/funds/info/"

let url = $request.url;
let body = ""

if (url.indexOf(info) != -1) {
	body = JSON.parse($response.body);
	body.data.gold = "999";
	body.data.ticket = "999";
	body.data.is_vip = "1";
	body.data.integral = "999";
	body.data.card_count = "999";
	body.data.vip_end_time = "1599999999";
	body.data.read_card_end_time = "1599999999";
} else if (url.indexOf(buy) != -1) {
	body = JSON.parse($response.body);
	body.code = "200";
	body.message = "购买成功";
} else {
	$done({});
}

body = JSON.stringify(body);
$done({body});
