var request=require('request');

var options = {
	headers: {"Connection": "close"},
    url: 'http://10.10.1.14:8081/jimu/score/findTask',
    method: 'POST',
    json:true,
    body: { 
		userId:"284902",
		type:"main",
		appType:"2",
		serviceVersion:"2.0.7",
		systemLanguage:"zh-hans",
		systemArea:"CN",
		requestTime:"9999999999",
		requestKey:"1627A17B44F0B0B442C68C953A960EAE"
	}
};

function callback(error, response, data) {
    if (!error && response.statusCode == 200) {
        console.log('----info------',data);
    }
}

request(options, callback);