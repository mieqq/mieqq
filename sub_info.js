/*
Surge配置参考注释，感谢@asukanana.
----------------------------------------
先将带有流量信息的订阅链接encode，用encode后的链接替换"url="后面的xxx，"reset_day="后面的数字替换成流量每月重置的日期，如1号就写1，8号就写8。
如需显示多个机场的信息，可以参照上述方法创建多个策略组以显示不同机场的信息，将Name替换成机场名字即可，脚本只需要一个。
示例↓↓↓
----------------------------------------
[Proxy Group]
Name1 = select, policy-path=http://sub.info?url=xxx&reset_day=1

Name2 = select, policy-path=http://sub.info?url=xxx&reset_day=8

[Script]
Sub_info = type=http-request,pattern=http://sub\.info,script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/sub_info.js
----------------------------------------
*/

(async () => {
  let params = getUrlParams($request.url);
  let reset_day = parseInt(params["due_day"] ||params["reset_day"] || 1);
  
  let info = await getUserInfo(params.url);
  let usage = getDataUsage(info);
  let used = usage.download + usage.upload;
  let total = usage.total;
  let days = getRmainingDays(reset_day);
  let body = `${bytesToSize(used)} | ${bytesToSize(total)} | ${days} Day${days == 1 ? "" : "s"}  = ss, 1.2.3.4, 1234, encrypt-method=aes-128-gcm,password=1234`;
  
    $done({response: {body}});
})();

function getUrlParams(url) {
  return Object.fromEntries(
    url.slice(url.indexOf('?') + 1).split('&')
   .map(item => item.split("="))
   .map(([k, v]) => [k, decodeURIComponent(v)])
  );   
}

function getUserInfo(url) {
  return new Promise(resolve => $httpClient.head(url, (err, resp) => 
resolve(resp.headers["subscription-userinfo"] || resp.headers["Subscription-userinfo"])));
}

function getDataUsage(info) {
  return Object.fromEntries(
    info.split("; ").map(item => item.split("="))
    .map(([k, v]) => [k,parseInt(v)])
  );
}

function getRmainingDays(reset_day) {
  let now = new Date();
  let today = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let daysInMonth = new Date(year, month, 0).getDate();
  if (reset_day > today) daysInMonth = 0;
  
  return daysInMonth - today + reset_day;
}

function bytesToSize(bytes) {
    bytes = parseInt(bytes);
    if (bytes === 0) return '0B';
    var k = 1024;
    sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}