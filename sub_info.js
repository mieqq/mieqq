(async () => {
  let params = getUrlParams($request.url);
  let due_day = parseInt(params["due_day"]) || 1;
  
  let info = await getUserInfo(params.url);
  let usage = getDataUsage(info);
  let used = usage.download + usage.upload;
  let total = usage.total;
  let days = getRmainingDays(due_day);
  let body = `${bytesToSize(used)} | ${bytesToSize(total)} | ${days} Day${days == 1 ? "" : "s"}  = ss, 1.2.3.4, 1234, encrypt-method=aes-128-gcm,password=1234`;
    console.log(body);
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

function getRmainingDays(due_day) {
  let now = new Date();
  let today = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let daysInMonth = new Date(year, month, 0).getDate();
  if (due_day > today) daysInMonth = 0;
  
  return daysInMonth - today + due_day;
}

function bytesToSize(bytes) {
    bytes = parseInt(bytes);
    if (bytes === 0) return '0B';
    var k = 1024;
    sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}