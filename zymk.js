let user_info = '/app_api/v5/getuserinfo/';
let coin_account = '/app_api/v5/coin_account/';
let ticket = '/app_api/v5/getuserinfo_ticket/';
// let purchase = '/app_api/v5/purchase_chapters_coin/';
let body = JSON.parse($response.body);
let url = $request.url;

if (url.indexOf(user_info) != -1) {
	body.data.coins = 999;
	body.data.isvip = 1;
	body.data.recommend = 999;
	body.data.Cticket = 999;
	body.data.Cgold = 999;
} else if (url.indexOf(coin_account) != -1) {
	body.data.coins = 999;
	body.data.golds = 999;
} else if (url.indexOf(ticket) != -1) {
	body.data.Cticket = 999;
	body.data.recommend = 999;	
} 

$done({body});

// http-response getuserinfo-globalapi.zymk.cn script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/zymk.js,requires-body = true

// hostname = getuserinfo-globalapi.zymk.cn
