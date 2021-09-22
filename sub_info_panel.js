/*
Surge配置参考注释，感谢@asukanana,感谢@congcong.

示例↓↓↓ 
----------------------------------------

[Script]
Sub_info = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/mieqq/mieqq/master/sub_info_panel.js,script-update-interval=0,argument=url=[URL encode 后的机场节点链接]&reset_day=1&title=AmyInfo

[Panel]
Sub_info = script-name=Sub_info

----------------------------------------

先将带有流量信息的节点订阅链接encode，用encode后的链接替换"url="后面的[机场节点链接]

可选参数 &reset_day，后面的数字替换成流量每月重置的日期，如1号就写1，8号就写8。如"&reset_day=8",不加该参数不显示流量重置信息。

可选参数 &expire，机场链接不带expire信息的，可以手动传入expire参数，如"&expire=2022-02-01",注意一定要按照yyyy-MM-dd的格式。

可选参数"title=xxx" 可以自定义标题。
----------------------------------------
*/

(async () => {
  let params = getUrlParams($argument)
  let resetDay = parseInt(params["reset_day"]);
  let resetLeft = getRmainingDays(resetDay);
  console.log(resetLeft)
  let usage = await getDataUsage(params.url);
  let used = usage.download + usage.upload;
  let total = usage.total;
  let expire = usage.expire || params.expire;
  let infoList = [`使用：${bytesToSize(used)} | ${bytesToSize(total)}`];

  if (resetLeft) {
    infoList.push(`重置：剩余${resetLeft}天`);
  }
  if (expire) {
    if (/^[\d]+$/.test(expire)) expire *= 1000;
    infoList.push(`到期：${formatTime(expire)}`);
  }

  let body = infoList.join("\n");
  $done({
		title: params.title,
		content: body,
               icon :"airplane.circle.fill"
	});
})();

function getUrlParams(url) {
  return Object.fromEntries(
    url
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function getUserInfo(url) {
  let request = { headers: { "User-Agent": "Quantumult%20X" }, url };
  return new Promise((resolve) =>
    setTimeout(
      () =>
        $httpClient.head(request, (err, resp) => {
          if (err) $done();
          resolve(
            resp.headers[
              Object.keys(resp.headers).find(
                (key) => key.toLowerCase() === "subscription-userinfo"
              )
            ]
          );
        }),
    )
  );
}

async function getDataUsage(url) {
  let info = await getUserInfo(url);
  if (!info) {
    $notification.post("SubInfo", "", "链接响应头不带有流量信息");
    $done();
  }
  return Object.fromEntries(
    info
      .match(/\w+=\d+/g)
      .map((item) => item.split("="))
      .map(([k, v]) => [k, parseInt(v)])
  );
}

function getRmainingDays(resetDay) {
  let now = new Date();
  let today = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
  if (!resetDay) return 0;
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  
  if (resetDay > today) daysInMonth = 0;

  return daysInMonth - today + resetDay;
}

function bytesToSize(bytes) {
  if (bytes === 0) return "0B";
  let k = 1024;
  sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

function formatTime(time) {
  let dateObj = new Date(time);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  return year + "年" + month + "月" + day + "日";
}
