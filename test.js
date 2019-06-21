$httpClient.post({
		url: "https://dlercloud.com/auth/login",
		headers: {
			"Content-Type": "application/json"
		},
		body: {
			"email": "619478198@qq.com",
			"passwd": "qq940614",
			"number-me": "",
			"code": "",
			"remember_me": "on"
		}
});

$httpClient.post({
  url: "https://dlercloud.com/user/checkin",
  body: "{}"
});

$done()


