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

$httpClient.post(table, function(error, response, data){
	if (error){
		console.log(error);
		$notification.post('Checkin', error, "");
		$done();				   
	} else {
		$httpClient.post("https://dlercloud.io/user/checkin", function(error, response, data){
			console.log(JSON.parse(data).msg);
			$notification.post('Checkin', JSON.parse(data).msg, "");
			$done();
		});
	}	
}
);

