/*
Surge配置参考注释，感谢@asukanana,感谢@congcong.
----------------------------------------
先将带有流量信息的订阅链接encode，用encode后的链接替换"url="后面的xxx，"reset_day="后面的数字替换成流量每月重置的日期，如1号就写1，8号就写8。

机场链接不带expire信息的，可以手动传入expire参数，如"expire=2022-02-01"

增加参数"alert=1"，流量用量超过80%，流量重置2天前、套餐到期10天前会发送通知，&title=xxx可以自定义通知的标题。

如需显示多个机场的信息，可以参照上述方法创建多个策略组以显示不同机场的信息，将Name替换成机场名字即可，脚本只需要一个。
示例↓↓↓
----------------------------------------
[Proxy Group]
Name1 = select, policy-path=http://sub.info?url=xxx&reset_day=1

Name2 = select, policy-path=http://sub.info?url=xxx&reset_day=8&expire=2022-02-01&alert=1

[Script]
Sub_info = type=http-request,pattern=http://sub\.info,script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/sub_info.js
----------------------------------------
*/

(async () => {
  let params = getUrlParams($request.url);
  let reset_day = parseInt(params["due_day"] || params["reset_day"]);
  
  let day_left = getRmainingDays(reset_day);
  let info = await getUserInfo(params.url);
  let usage = getDataUsage(info);
  let used = bytesToSize(usage.download + usage.upload);
  let total = bytesToSize(usage.total);
  let expire = usage.expire || params.expire;
  let http = "=http, localhost, 6152";
  let body = `Usage: ${used} | ${total}`;
  
  if (day_left) {
    body += `\nTraffic Reset: ${day_left} Day${day_left == 1 ? "" : "s"}`;
  }
  if (expire) {
    if (/^[\d]+$/.test(expire)) {
      expire = formatTimestamp(expire*1000);
    }
    body += `\nExpire Date: ${expire}`;
  }
    Sendnotification(usage, day_left, expire, params, body);
    body = body.split("\n").map(item => item + http).join("\n")
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
  let headers = {"User-Agent": "Quantumult X"}
  let request = {headers, url}
  return new Promise(resolve => 
    $httpClient.head(request, (err, resp) => 
      resolve(resp.headers["subscription-userinfo"] || resp.headers["Subscription-userinfo"] || resp.headers["Subscription-Userinfo"])
    )
  );
}

function getDataUsage(info) {
  return Object.fromEntries(
    info.match(/\w+=\d+/g).map(item => item.split("="))
    .map(([k, v]) => [k,parseInt(v)])
  );
}

function getRmainingDays(reset_day) {
  if (!reset_day) return 0;
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
    let k = 1024;
    sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

function formatTimestamp( timestamp ) {
    let dateObj = new Date( timestamp );
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    month = month < 10 ? '0' + month : month
    let day = dateObj.getDate();
    day = day < 10 ? '0' + day : day
    return year +"-"+ month +"-" + day;
}

function Sendnotification(usage, day_left, expire, params, body) {
  if (!params.alert) return;
  let now = new Date();
  let hour = now.getHours();
  let today = now.getDay();
  //if (hour < 18 || hour > 22) return;
  
  let Counter = $persistentStore.read("SubInfo") || '{"expire": {}, "day_left": {}, "used": {}}'
  Counter = JSON.parse(Counter);
  Object.keys(Counter).forEach(k => {
    if (!Counter[k][today]) {
      Counter[k] = {};
      Counter[k][today] = 0;
    }
  })
 
  let title = params.title || "Sub Info";
  let used = usage.download + usage.upload;
  
  if (used/usage.total > 0.8 && Counter.used[today] < 10) { 
    $notification.post(title, `剩余流量不足${parseInt(used/usage.total*100)}%`, body)
    Counter.used[today] += 1
  }
  if (day_left && day_left < 3 && Counter["day_left"][today] < 10) {
    $notification.post(title, `流量将在${day_left}天内重置`, body)
    Counter["day_left"][today] += 1
  }
  if (expire && Counter.expire[today]  < 10) {
    expire = (/^[\d]+$/.test(expire)) ? expire*1000 : expire;
    let diff = (new Date(expire) - now) / (1000*3600*24)
    if (diff < 10) {
      $notification.post(title, `套餐剩余时间不足${parseInt(diff)}天`, body)
      Counter.expire[today] += 1
    } 
  }
 $persistentStore.write(JSON.stringify(Counter),"SubInfo")
}