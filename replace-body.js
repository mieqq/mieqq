function getRegex(str) {
  var regParts = str.match(/^\/(.*?)\/([gim]*)$/);
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
