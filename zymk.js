let user = '/app_api/v5/getuserinfo/';
let coin = '/app_api/v5/coin_account/';
let ticket = '/app_api/v5/getuserinfo_ticket/';

let res = ""
try {
res = JSON.parse($response.body);
}
catch(error) {
$done({});
}

if ($request.url.indexOf(user) != -1) {
	res.data.coins = 999;
	res.data.isvip = 1;
	res.data.recommend = 999;
	res.data.Cticket = 999;
	res.data.Cgold = 999;
} else if ($request.url.indexOf(coin) != -1){   
	res.data.coins = 999;
	res.data.golds = 999;
} else if ($request.url.indexOf(ticket) != -1) {
	res.data.Cticket = 999;	
} else {
    $done({});
}

body = JSON.stringify(res);

$done({body});

// http-response getuserinfo-globalapi.zymk.cn script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/zymk.js,requires-body = true

// hostname = getuserinfo-globalapi.zymk.cn
