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
  let [match, replace] = $argument.split("=");
  //console.log(match);
  //console.log(replace);
  let re = getRegex(match);
  //console.log(re);
  body = $response.body.replace(re, replace);
  $done({ body });
}
