const table = {
	url: "https://dlercloud.io/auth/login",
	header: {
		"Content-Type": "application/json"
	},
	body: {
		"email": "",
		"passwd": "",
		"number-me": "",
		"code": "",
		"remember_me": 'on'
	}
}

$httpClient.post(table, function(error, response, data){
	if (error){
		console.log(error);
//		$notification.post('Checkin', error, "");
		$done();				   
	} else {
		$httpClient.post("https://dlercloud.io/user/checkin", function(error, response, data){
			console.log(JSON.parse(data).msg);
//			$notification.post('Checkin', JSON.parse(data).msg, "");
			$done();
		});
	}	
}
);


//1. 自行下载放到 Surge 配置的文件夹中，
//2. 在table那填入账户密码如 "emali": "xxx@qq.com", "passwd": "123456"
//3. 配置文件填入如下
//[Script]
//cron "0 * * * *" script-path=test.js
//4. 需要通知可以取消 $notification 行的注释
