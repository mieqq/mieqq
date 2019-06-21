const URL_PREFIX = "https://dlercloud.me";

async function checkin() {
	let resp = await $http.post({
		url: URL_PREFIX + "/user/checkin"
	});
	return resp.data;
}

async function logout() {
	await $http.get(URL_PREFIX + "/user/logout");
}

async function login(email, passwd, code = '') {
	await logout()
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
	})
	return resp.data;
}


let loginRes = login('619478198@qq.com', 'qq940614', '')
console.log("-----------------------------")
console.log(loginRes.ret)
