function cb1(error, response, data){ 	
		console.log(error);
		 }

$httpClient.get("https://www.baidu.com/", cb1);

$done({})
