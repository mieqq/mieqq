function cb1(error, response, data){ 	
		console.log(data);
		 }

$httpClient.get("https://www.baidu.com/", cb1);

async function login(email, passwd, code = '') {
	let resp = await $http.post({
		url: URL_PREFIX + "/auth/login",
		header: {
			"Content-Type": "application/json"
		},
		body: {
			"email": email,
			"passwd": passwd,
			"number-me": "",
			"code": code,
			"remember_me": 'on'
		}
}, cb1)

login("619478198@qq.com", "qq940614", "")
	

$done({})
