//async function checkin() {
//	let resp = await $httpClient.post({
//		url: URL_PREFIX + "/user/checkin"
//	});
//	return resp.data;
//}


let test = $httpClient.get("https://dlercloud.me/user/logout");
console.log(test.error)


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
