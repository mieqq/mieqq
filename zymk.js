let user_info = '/app_api/v5/getuserinfo/';
let coin_account = '/app_api/v5/coin_account/';
let ticket = '/app_api/v5/getuserinfo_ticket/';
var obj = JSON.parse(body);

if (url.indexOf(user_info) != -1) {
	obj['data']['coins'] = 999;
	obj['data']['isvip'] = 1;
	obj['data']['vipdays'] = 999;
	obj['data']['recommend'] = 999;
	obj['data']['Cticket'] = 999;
	obj['data']['Cgold'] = 999;
} else if (url.indexOf(coin_account) != -1) {
	obj['data']['coins'] = 999;
	obj['data']['golds'] = 999;
} else if (url.indexOf(ticket) != -1) {
	obj['data']['Cticket'] = 999;
	obj['data']['recommend'] = 999;
	
}

JSON.stringify(obj);
