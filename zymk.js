let user_info = '/app_api/v5/getuserinfo/';
let coin_account = '/app_api/v5/coin_account/';
let ticket = '/app_api/v5/getuserinfo_ticket/';
let purchase = '/app_api/v5/purchase_chapters_coin/';
var obj = JSON.parse(body);

if (url.indexOf(user_info) != -1) {
	obj['data']['coins'] = 999;
	obj['data']['Uviptime'] = 6847833600000;
	obj['data']['vipdate'] = "2030-01-01 00:00:00";
	obj['data']['isvip'] = 1;
	obj['data']['vipdays'] = 999;
	obj['data']['recommend'] = 999;
	obj['data']['Cticket'] = 999;
	obj['data']['Cgold'] = 999;
	obj['data']['vipdays'] = 999;
} else if (url.indexOf(coin_account) != -1) {
	obj['data']['coins'] = 999;
	obj['data']['golds'] = 999;
} else if (url.indexOf(ticket) != -1) {
	obj['data']['Cticket'] = 999;
	obj['data']['recommend'] = 999;	
} else if (url.indexOf(purchase) != -1) {
	obj['data']['isvip'] = 1;
	obj['data']['Cgold'] = 999;	
	obj['data']['Cticket'] = 999;
	obj['data']['Cdiamonds'] = 999;
	obj['status'] = 0;
	obj['msg'] = "ok";
}

JSON.stringify(obj);