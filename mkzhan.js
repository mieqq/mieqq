let buy = "comic.mkzcdn.com/chapter/buy/add/"
let info = "member.mkzcdn.com/user/funds/info/"
let check = "comic.mkzcdn.com/chapter/read/check/"

let url = $request.url;

if (url.indexOf(info) != -1) {
	let body = JSON.parse($response.body);
	body.data.gold = "999";
	body.data.ticket = "999";
	body.data.is_vip = "1";
	body.data.integral = "999";
	body.data.card_count = "999";
	body.data.vip_end_time = "1599999999";
	body.data.read_card_end_time = "1599999999";
	body = JSON.stringify(body);
	$done({body});
} else if (url.indexOf(buy) != -1) {
	let body = JSON.parse($response.body);
	body.code = "200";
	body.message = "购买成功";
	body = JSON.stringify(body);
	$done({body});
} else if (url.indexOf(check) != -1) {
	let body = JSON.parse($response.body);
	body.code = "200";
	body.message = "用户已购买过该章节可以直接阅读";
	body.data.pass_type = "4";
} else {
	$done({});
}