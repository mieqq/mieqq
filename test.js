function cb1(value){ console.log(value) }

let test = $httpClient.post({
		url: "https://dlercloud.me/auth/login",
		header: {
			"Content-Type": "application/json"
		},
		body: {
			"email": "619478198@qq.com",
			"passwd": "qq940614",
			"number-me": "",
			"code": "",
			"remember_me": 'on'
		}
	}, cb1);

$done({})
