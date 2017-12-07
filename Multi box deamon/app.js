var conf = require('./conf');

var chanceOfFire = 0.00001;


// Check if AE exists and create if not
getValue(conf.ae, '2', function (status, res_body, to) {
	if (status == '4004') {
		createAe(conf.ae, function (res, res_body) {
			if (res.statusCode == 201) {
				console.log('AE created -> ' + conf.ae.name);
			}
			else {
				console.log('Error creating AE');
				console.log(res_body);
			}
			checkIfContainerExists();
		});
	}
	else {
		checkIfContainerExists();
	}
});

var count = 0;
function checkIfContainerExists() {
	if (count == conf.cnt.length) {
		setInterval(getTemp, 3000);
		setInterval(getSmoke, 3000);
		setInterval(getPeople, 3000);
		return;
	}
	var container = conf.cnt[count];
	getValue(container, '-1', function (status, res_body, to) {
		if (status == '4004') {
			createCont(container, function (res, res_body) {
				if (res.statusCode == 201) {
					console.log('Cnt created -> ' + container.name);
				}
				else {
					console.log('Error creating Cnt -> ' + container.parent + '/' + container.name);
					console.log(res_body);
				}
				count++;
				checkIfContainerExists();
			});
		}
		else {
			count++;
			checkIfContainerExists();
		}
	});
}

function getTemp() {
	for (var i = 0; i < conf.floors.length; i++) {
		for (var j = 0; j < conf.boxes.length; j++) {
			var temp = getRandomValue(18, 22);
			var name = 'cnt_temp';
			var cin = { ctname: name, con: temp };
			sendDataToServer(conf.floors[i], conf.boxes[j], JSON.stringify(cin));
		}
	}
}

function getSmoke() {
	for (var i = 0; i < conf.floors.length; i++) {
		for (var j = 0; j < conf.boxes.length; j++) {
			var temp = getRandomValue(9, 10);
			var name = 'cnt_temp';
			var cin = { ctname: name, con: temp };
			sendDataToServer(conf.floors[i], conf.boxes[j], JSON.stringify(cin));
		}
	}
}

function getPeople() {
	for (var i = 0; i < conf.floors.length; i++) {
		for (var j = 0; j < conf.boxes.length; j++) {
			var temp = getRandomValue(0, 1);
			var name = 'cnt_temp';
			var cin = { ctname: name, con: temp };
			sendDataToServer(conf.floors[i], conf.boxes[j], JSON.stringify(cin));
		}
	}
}

function getRandomValue(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function sendDataToServer(floor, box, data) {

	var jsonObj = JSON.parse(data);
	var ctname = jsonObj.ctname;
	var content = jsonObj.con;

	for (var j = 0; j < conf.cnt.length; j++) {
		if (conf.cnt[j].name == ctname && conf.cnt[j].parent.indexOf(floor) !== -1 && conf.cnt[j].parent.indexOf(box) !== -1) {
			crtci(conf.cnt[j], content.toString(), function (status, res_body, to) {
				try {
					var to_arr = to.split('/');
					var ctname = to_arr[to_arr.length - 1];
					var result = {};
					result.ctname = ctname;
					result.con = content;

					console.log('<---- x-m2m-rsc : ' + status + ' <----');
					if (status == 5106 || status == 2001 || status == 4105) {
						console.log('<---- x-m2m-rsc : ', result);
					}
					else if (status == 5000) {
						console.log('<---- x-m2m-rsc : ', result);
					}
					else if (status == 9999) {
						console.log('<---- x-m2m-rsc : ', result);
					}
					else {
						console.log('<---- x-m2m-rsc : ', result);
					}
				}
				catch (e) {
					console.log(e.message);
				}
			});
		}
	}
}

function crtci (container, content, callback) {

	var results_ci = {};
	var bodyString = '';

	results_ci['m2m:cin'] = {};
	results_ci['m2m:cin'].con = content;

	bodyString = JSON.stringify(results_ci);

	var parent_path = container.parent + '/' + container.name;

	http_request(container.parent + '/' + container.name, 'post', '4', bodyString, function (res, res_body) {
		callback(res.headers['x-m2m-rsc'], res_body, parent_path);
	});
}

function getValue(container, ty, callback) {
	var parent_path = container.parent + '/' + container.name;
	http_request(parent_path, 'get', ty, '', function (res, res_body) {
		callback(res.headers['x-m2m-rsc'], res_body, parent_path);
	});
}

function createAe(ae, callback) {
	var options = {
		hostname: conf.cse.host,
		port: conf.cse.port,
		path: ae.parent,
		method: 'post',
		headers: {
			'X-M2M-RI': "12345",
			'Accept': 'application/xml',
			'X-M2M-Origin': 'S'
		}
	};
	var bodyString = '<?xml version= "1.0" encoding= "UTF-8" ?>' +
					 '<m2m:ae mlns:m2m="http://www.onem2m.org/xml/protocols" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" rn="' + ae.name + '">' +
					 '	<api>0.2.481.2.0001.001.000111</api>' +
					 '	<lbl>key1 key2</lbl>' +
					 '	<rr>true</rr>' +
		'</m2m:ae >';

	if (bodyString.length > 0) {
		options.headers['Content-Length'] = bodyString.length;
	}
	options.headers['Content-Type'] = 'application/vnd.onem2m-res+xml; ty=2';

	var http = require('http');
	var res_body = '';
	var req = http.request(options, function (res) {

		res.on('data', function (chunk) {
			res_body += chunk;
		});

		res.on('end', function () {
			callback(res, res_body);
		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	req.write(bodyString);
	req.end();
}

function createCont(cont, callback) {
	var options = {
		hostname: conf.cse.host,
		port: conf.cse.port,
		path: cont.parent,
		method: 'post',
		headers: {
			'X-M2M-RI': "12345",
			'Accept': 'application/xml',
			'X-M2M-Origin': 'S'
		}
	};
	var bodyString = '<?xml version= "1.0" encoding= "UTF-8" ?>' +
		'<m2m:cnt mlns:m2m="http://www.onem2m.org/xml/protocols" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" rn="' + cont.name + '">' +
		'	<lbl>key1 key2</lbl>' +
		'</m2m:cnt >';

	if (bodyString.length > 0) {
		options.headers['Content-Length'] = bodyString.length;
	}
	options.headers['Content-Type'] = 'application/vnd.onem2m-res+xml; ty=3';

	var http = require('http');
	var res_body = '';
	var req = http.request(options, function (res) {

		res.on('data', function (chunk) {
			res_body += chunk;
		});

		res.on('end', function () {
			callback(res, res_body);
		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	req.write(bodyString);
	req.end();
}

function http_request(path, method, ty, bodyString, callback) {
	var options = {
		hostname: conf.cse.host,
		port: conf.cse.port,
		path: path,
		method: method,
		headers: {
			'X-M2M-RI': "12345",
			'Accept': 'application/' + conf.ae.bodytype,
			'X-M2M-Origin': conf.ae.id
		}
	};

	if (bodyString.length > 0) {
		options.headers['Content-Length'] = bodyString.length;
	}

	if (ty != '-1') {
		var a = (ty === '') ? '' : ('; ty=' + ty);
		options.headers['Content-Type'] = 'application/vnd.onem2m-res+' + conf.ae.bodytype + a;
	}

	var http = require('http');
	var res_body = '';
	var req = http.request(options, function (res) {

		res.on('data', function (chunk) {
			res_body += chunk;
		});

		res.on('end', function () {
			callback(res, res_body);
		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	req.write(bodyString);
	req.end();
}