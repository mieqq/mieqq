/*
  Surge 脚本实现 Qx 的 response-body、和request-body 重写类型
  
  如 Qx：
  https://service.ilovepdf.com/v1/user url response-body false response-body true
   
   可改写为 Surge：
   test = type=http-response,pattern=https://service.ilovepdf.com/v1/user,requires-body=1,max-size=0,script-path= https://raw.githubusercontent.com/mieqq/mieqq/master/replace-body.js,argument=false=true
   
  argument=匹配值=替换值，可以用正则匹配，如argument=/\w+/=test，也支持多参数，如：argument=匹配值1=替换值1&匹配值2=替换值2
  
*/

function getRegex(str) {
  let regParts = str.match(/^\/(.*?)\/([gim]*)$/);
  if (regParts) {
    return new RegExp(regParts[1], regParts[2]);
  } else {
    return new RegExp(str);
  }
}

if (typeof $argument == "undefined") {
  $done({});
} else {
  let body;
  if ($script.type === "http-response") {
    body = $response.body;
  } else {
    body = $request.body;
  }

  $argument.split("&").forEach((item) => {
    let [match, replace] = item.split("=");
    let re = getRegex(match);
    body = body.replace(re, replace);
  });

  $done({ body });
}
