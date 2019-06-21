function cb1(error, response, data){ 	
		console.log(response.status);
		 }

$httpClient.get("https://www.baidu.com/", cb1);

$done({})
