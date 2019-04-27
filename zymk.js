var obj = JSON.parse(body);
obj['data']['coins'] = 999;
obj['data']['vipdate'] = '2020-01-01 00:00:00:00'
obj['data']['isvip'] = 0
obj['data']['vipdays'] = 999
obj['data']['recommend'] = 999
obj['data']['Cticket'] = 999
obj['data']['Cgold'] = 999
JSON.stringify(obj);