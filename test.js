function cb1(error, response, data){
    console.log(error)
	$httpClient.post("https://dlercloud.me/user/checkin", cb2);
	$done();
}

function cb2(error, response, data){
	console.log("1")
}


$httpClient.post({
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
},cb1)

$done();
