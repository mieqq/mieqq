let user = '/app_api/v5/getuserinfo/';
let coin = '/app_api/v5/coin_account/';
let ticket = '/app_api/v5/getuserinfo_ticket/';

let body = "";

if ($request.url.indexOf(user) != -1) {
    body = JSON.parse($response.body);
	body.data.coins = 999;
	body.data.isvip = 1;
	body.data.recommend = 999;
	body.data.Cticket = 999;
	body.data.Cgold = 999;
} else if ($request.url.indexOf(coin) != -1){   body = JSON.parse($response.body);
	body.data.coins = 999;
	body.data.golds = 999;
} else if ($request.url.indexOf(ticket) != -1) {
    body = JSON.parse($response.body);
	body.data.Cticket = 999;	
} else {
    $done({});
}

body = JSON.stringify(body);

$done({body});

// http-response getuserinfo-globalapi.zymk.cn script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/zymk.js,requires-body = true

// hostname = getuserinfo-globalapi.zymk.cn
