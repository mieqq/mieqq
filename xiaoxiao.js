let request = {
    url: $request.url,
    headers: $request.headers,
};

$httpClient.get(request, function(error, response, data) {
    let body = JSON.parse(data); 
    let headers = response.headers;
    delete headers["Transfer-Encoding"]
    callback(body, headers)
})


const path1 = "/ucp/index";
const ad = 'ssp-svr/ssp/list3';
const adold = 'getGlobalData';

function callback(body, headers) {
    let url = $request.url;
    if (url.indexOf(path1) != -1){
	body.data.uinfo["down_daily_remainders"] = "666";
	body.data.uinfo["play_daily_remainders"] = "666";
	body.data.uinfo["curr_group"] = "5";
	body.data.user["isvip"] = "1";
	body.data.user["goldcoin"] = "666";
}

    if (url.indexOf(ad) != -1) {
         delete body.data.pmap
    }

    if (url.indexOf(adold) != -1) {
         delete body.data.adrows
         delete body.data.adgroups
         delete body.data.iOS_adgroups
    }
    $done({response: {body: JSON.stringify(body), headers}});
}
