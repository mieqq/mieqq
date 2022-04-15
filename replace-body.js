/*
  Surge 脚本实现 Qx 的 response-body、和request-body 重写类型
  
  如 Qx：
  https://service.ilovepdf.com/v1/user url response-body false response-body true
   
   可改写为 Surge：
   test = type=http-response,pattern=https://service.ilovepdf.com/v1/user,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/replace-body.js,argument=false=true
   
  argument=匹配值=替换值，可以用正则匹配，如argument=/\w+/g=test，也支持多参数，如：argument=匹配值1=替换值1&匹配值2=替换值2
  
  response-body 脚本类型选择 type=http-response、request-body 脚本类型选择 type=http-request，注意必须打开需要body（requires-body=1）
  
  tips 修改json格式的键值对可以这样：
  argument=("key"):\s?"(.+?)"=$1: "new_value"
  
*/

function getRegexp(re_str) {
	let regParts = re_str.match(/^\/(.*?)\/([gim]*)$/);
	if (regParts) {
		return new RegExp(regParts[1], regParts[2]);
	} else {
		return new RegExp(re_str);
	}
}

if (typeof $argument == "undefined") {
	$done({});
} else {
	let body;
	if ($script.type === "http-response") {
		body = $response.body;
	} else if ($script.type === "http-request") {
		body = $request.body;
	} else {
		$done({});
	}

	$argument.split("&").forEach((item) => {
		let [match, replace] = item.split("=");
		let re = getRegexp(match);
		body = body.replace(re, replace);
	});

	$done({ body });
}
