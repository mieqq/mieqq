function cb2(error, response, data){
	console.log(JSON.parse(data).msg);
}

async function login(){	
	await $httpClient.post({
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
	})
	await checkin()
}

async function checkin(){
	
	await $httpClient.post("https://dlercloud.me/user/checkin", cb2)
}

login()
	
$done()
