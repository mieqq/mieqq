const URL_PREFIX = "https://dlercloud.me";

async function checkin() {
	let resp = await $httpClient.post({
		url: URL_PREFIX + "/user/checkin"
	});
	return resp.data;
}

async function logout() {
	await $httpClient.get(URL_PREFIX + "/user/logout");
}

async function login(email, passwd, code = '') {
	await logout()
	let resp = await $httpClient.post({
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
	})

//	await checkin()
}


let loginRes = login('619478198@qq.com', 'qq940614', '')
console.log(loginRes.error)

$done()
