function cb1(error, response, data){ 	
		console.log(error);
		 }

$httpClient.get({
		url: "https://www.baidu.com/",
		}
	}, cb1(error, response, data));

$done({})
