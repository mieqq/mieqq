//async function checkin() {
//	let resp = await $httpClient.post({
//		url: URL_PREFIX + "/user/checkin"
//	});
//	return resp.data;
//}

function cb1(value){ console.log(value.error) }

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




//async function login(email, passwd, code = '') {
//	await logout()
//	let resp = await $httpClient.post({
//		url: URL_PREFIX + "/auth/login",
//		header: {
//			"Content-Type": "application/json"
//		},
//		body: {
//			"email": email,
//			"passwd": passwd,
//			"number-me": "",
//			"code": code,
//			"remember_me": 'on'
//		}
//	})
//	console.log(resp.error)
//	await checkin()
//}


//let loginRes = login('619478198@qq.com', 'qq940614', '')

$done({})
