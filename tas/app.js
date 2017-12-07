/**
 * Created by ryeubi on 2015-08-31.
 * Updated 2017.03.06
 * Made compatible with Thyme v1.7.2
 */

var onPi = true;

var net = require('net');
var util = require('util');
var fs = require('fs');
var xml2js = require('xml2js');
var Mcp3008 = onPi ? require('mcp3008.js') : null;
var gpio = onPi ? require('onoff').Gpio : null;


var wdt = require('./wdt');

var useparentport = '';
var useparenthostname = '';
var adc = Mcp3008 != null ? new Mcp3008() : null;

var thresholds = {
	temp: 50,
	smoke: 1.5,
	people: 500
};

var upload_arr = [];
var download_arr = [];

var conf = {};

// This is an async file read
fs.readFile('conf.xml', 'utf-8', function (err, data) {
    if (err) {
        console.log("FATAL An error occurred trying to read in the file: " + err);
        console.log("error : set to default for configuration")
    }
    else {
        var parser = new xml2js.Parser({explicitArray: false});
        parser.parseString(data, function (err, result) {
            if (err) {
                console.log("Parsing An error occurred trying to read in the file: " + err);
                console.log("error : set to default for configuration")
            }
            else {
                var jsonString = JSON.stringify(result);
                conf = JSON.parse(jsonString)['m2m:conf'];
				
                useparenthostname = conf.tas.parenthostname;
                useparentport = conf.tas.parentport;

                if(conf.upload != null) {
                    if (conf.upload['ctname'] != null) {
                        upload_arr[0] = conf.upload;
                    }
                    else {
                        upload_arr = conf.upload;
                    }
                }

                if(conf.download != null) {
                    if (conf.download['ctname'] != null) {
                        download_arr[0] = conf.download;
                    }
                    else {
						download_arr = conf.download;
						if (onPi) {
							for (var i = 0; i < download_arr.length; i++) {
								download_arr[i].led = new gpio(download_arr[i].channel, 'out');
							}
						}
                    }
                }
            }
        });
    }
});


var tas_state = 'init';

var upload_client = null;

var t_count = 0;


function temp_upload_action() {
	if (tas_state == 'upload') {
		for (var i = 0; i < upload_arr.length; i++) {
			if (upload_arr[i].id == 'temp') {
				if (onPi) {
					adc.read(parseInt(upload_arr[i].channel), function (value) {
						var mVolts = value * 5000.0 / 1024.0;
						var temp = (mVolts - 100.0) / 10.0 - 40.0;
						prepare_data(upload_arr[i].ctname, temp);
						if (temp > thresholds.temp) {
							// Fire
						}
					});
				}
				else {
					prepare_data(upload_arr[i].ctname, 20);
				}
				break;
			}
		}
    }
}

function smoke_upload_action() {
	if (tas_state == 'upload') {
		for (var i = 0; i < upload_arr.length; i++) {
			if (upload_arr[i].id == 'smoke') {
				if (onPi) {
					adc.read(parseInt(upload_arr[i].channel), function (value) {
						var volt = value / 1024.0 * 5.0;
						var RS = (5.0 - volt) / volt;
						var R0 = 10;
						var ratio = RS / R0;
						prepare_data(upload_arr[i].ctname, ratio);
						if (ratio < thresholds.smoke) {
							// Fire
						}
					});
				}
				else {
					prepare_data(upload_arr[i].ctname, 0);
				}
				break;
			}
		}
	}
}

function people_upload_action() {
	if (tas_state == 'upload') {
		for (var i = 0; i < upload_arr.length; i++) {
			if (upload_arr[i].id == 'people') {
				if (onPi) {
					adc.read(parseInt(upload_arr[i].channel), function (value) {
						var people = value > thresholds.people ? 1 : 0;
						prepare_data(upload_arr[i].ctname, people);
					});
				}
				else {
					prepare_data(upload_arr[i].ctname, 0);
				}
				break;
			}
		}
	}
}

function prepare_data(ct_name, value) {
	var con = value.toString();
	var cin = { ctname: ct_name, con: con };
	console.log(JSON.stringify(cin) + ' ---->');
	upload_client.write(JSON.stringify(cin) + '<EOF>');
}

var tas_download_count = 0;

function on_receive(data) {
    if (tas_state == 'connect' || tas_state == 'reconnect' || tas_state == 'upload') {
        var data_arr = data.toString().split('<EOF>');
        if(data_arr.length >= 2) {
            for (var i = 0; i < data_arr.length - 1; i++) {
                var line = data_arr[i];
                var sink_str = util.format('%s', line.toString());
                var sink_obj = JSON.parse(sink_str);

                if (sink_obj.ctname == null || sink_obj.con == null) {
                    console.log('Received: data format mismatch');
                }
                else {
                    if (sink_obj.con == 'hello') {
                        console.log('Received: ' + line);

                        if (++tas_download_count >= download_arr.length) {
                            tas_state = 'upload';
                        }
                    }
                    else {
                        for (var j = 0; j < upload_arr.length; j++) {
                            if (upload_arr[j].ctname == sink_obj.ctname) {
                                console.log('ACK : ' + line + ' <----');
                                break;
                            }
                        }

                        for (j = 0; j < download_arr.length; j++) {
                            if (download_arr[j].ctname == sink_obj.ctname) {
                                g_down_buf = JSON.stringify({id: download_arr[j].id, con: sink_obj.con});
								console.log(g_down_buf + ' <----');
								if (onPi) {
									download_arr[j].led.writeSync(parseInt(sink_obj.con));
								}
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}

function tas_watchdog() {
    if(tas_state == 'init') {
        upload_client = new net.Socket();

        upload_client.on('data', on_receive);

        upload_client.on('error', function(err) {
            console.log(err);
            tas_state = 'reconnect';
        });

        upload_client.on('close', function() {
            console.log('Connection closed');
            upload_client.destroy();
            tas_state = 'reconnect';
        });

        if(upload_client) {
			console.log('tas init ok');
			tas_state = 'connect';
        }
    }
    else if(tas_state == 'connect' || tas_state == 'reconnect') {
        upload_client.connect(useparentport, useparenthostname, function() {
            console.log('upload Connected');
            tas_download_count = 0;
            for (var i = 0; i < download_arr.length; i++) {
                console.log('download Connected - ' + download_arr[i].ctname + ' hello');
                var cin = {ctname: download_arr[i].ctname, con: 'hello'};
                upload_client.write(JSON.stringify(cin) + '<EOF>');
            }

            if (tas_download_count >= download_arr.length) {
                tas_state = 'upload';
            }
        });
    }
}

wdt.set_wdt(require('shortid').generate(), 3, tas_watchdog);
wdt.set_wdt(require('shortid').generate(), 3, temp_upload_action);
wdt.set_wdt(require('shortid').generate(), 3, smoke_upload_action);
wdt.set_wdt(require('shortid').generate(), 3, people_upload_action);

var g_down_buf = '';

function saveLastestData(data) {
    if(tas_state == 'upload') {
        for(var i = 0; i < upload_arr.length; i++) {
            if(upload_arr[i].ctname == 'cnt-co2') {
                var cin = {ctname: upload_arr[i].ctname, con: nValue.toString()};
                console.log('SEND : ' + JSON.stringify(cin) + ' ---->');
                upload_client.write(JSON.stringify(cin) + '<EOF>');
                break;
            }
        }
    }
}

function showError(error) {
    var error_str = util.format("%s", error);
    console.log(error.message);
    if (error_str.substring(0, 14) == "Error: Opening") {

    }
}

