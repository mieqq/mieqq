const table = {
	url: "https://dlercloud.io/auth/login",
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
}

function getNetworkStatus(data) {
	let res = { usage: 0, detail: '' }
	let usageReg = /width: (.*?)%;/
	let detailRege = /(可用：.*?(?:K|M|G|T)B)[\s\S]*?(已用：.*?(?:K|M|G|T)B)/
	if (usageReg.test(data)) {
		res.usage = RegExp.$1
	}
	if (detailRege.test(data)) {
		res.detail = `${RegExp.$1} / ${RegExp.$2}`
	}
	return res
}

$httpClient.post(table, function(error, response, data){
	if (error){
		console.log(error);
		$notification.post('Dler Cloud', error, "");
		$done();				   
	} else {
		$httpClient.post("https://dlercloud.io/user/checkin", function(error, response, data){
			console.log(JSON.parse(data).msg);
			let checkin = JSON.parse(data).msg
			$httpClient.get("https://dlercloud.io/user", function(error, response, data){
				let userinfo = getNetworkStatus(data)
				$notification.post('Dler Cloud', checkin, userinfo.detail);
				$done();
			});

		});
		
	}	
});


//0. Dler 机场定时签到，没有什么实际意义，仅供参考
//1. 自行下载放到 Surge 配置的文件夹中
//2. 在table那填入账户密码如 "emali": "xxx@qq.com", "passwd": "123456"
//3. 配置文件填入如下
//[Script]
//cron "0 * * * *" script-path=test.js
//4. 上面的 crontab "0 * * * *" 为每小时0分触发，可以自己查表更改
//5. 不需要通知可以注释掉 $notification 所在行
