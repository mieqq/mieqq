let buy = "comic.mkzcdn.com/chapter/buy/add/"
let info = "member.mkzcdn.com/user/funds/info/"

let url = $request.url;
let obj = "";

if (url.indexOf(info) != -1) {
	obj = JSON.parse($response.body);
	obj.data.gold = "999";
	obj.data.ticket = "999";
	obj.data.is_vip = "1";
	obj.data.integral = "999";
	obj.data.card_count = "999";
	obj.data.vip_end_time = "1599999999";
	obj.data.read_card_end_time = "1599999999";
} else if (url.indexOf(buy) != -1) {
	obj = JSON.parse($response.body);
	obj.code = "200";
	obj.message = "购买成功";
} else {
	$done({});
}

obj = JSON.stringify(obj);
$done({body: obj});
