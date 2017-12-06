/**
 * Created by Il Yeup, Ahn in KETI on 2017-02-23.
 */

/**
 * Copyright (c) 2017, OCEAN
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var fs = require('fs');
var aei = JSON.parse(fs.readFileSync('aei.json')).id;


var conf = {};
var cse = {};
var ae = {};
var cnt_arr = [];
var sub_arr = [];
var acp = {};

conf.useprotocol = 'http'; // select one for 'http' or 'mqtt' or 'coap' or 'ws'

// build cse
cse.host        = '192.168.0.15';
cse.port        = '7579';
cse.name        = 'Mobius';
cse.id          = '/Mobius';
cse.mqttport    = '1883';
cse.wsport      = '7577';

// build ae
if(aei != 'S') {
    ae.id = aei;
}
else {
    ae.id = 'S';
}
ae.parent       = '/' + cse.name;
ae.name         = 'Firetracker';
ae.appid        = 'Firetracker';
ae.port         = '9727';
ae.bodytype     = 'json'; // select 'json' or 'xml' or 'cbor'
ae.tasport = '3105';

var building = 'Gwanggaeto_gwan';
var floor = 'F1';
var box = 'ML_box_5';


// build cnt
var count = 0;
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = building
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + building;
cnt_arr[count++].name = floor
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + building + '/' + floor;
cnt_arr[count++].name = box;
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + building + '/' + floor + '/' + box;
cnt_arr[count++].name = 'cnt_temp';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + building + '/' + floor + '/' + box;
cnt_arr[count++].name = 'cnt_smoke';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + building + '/' + floor + '/' + box;
cnt_arr[count++].name = 'cnt_people';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + building + '/' + floor + '/' + box;
cnt_arr[count++].name = 'cnt_led_green';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + building + '/' + floor + '/' + box;
cnt_arr[count++].name = 'cnt_led_red';
//cnt_arr[count] = {};
//cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
//cnt_arr[count++].name = 'cnt-timer';

// build sub
//count = 0;
//sub_arr[count] = {};
//sub_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[1].name;
//sub_arr[count].name = 'sub-ctrl';
//sub_arr[count++].nu = 'mqtt://' + cse.host + '/' + ae.id;

//sub_arr[count] = {};
//sub_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[1].name;
//sub_arr[count].name = 'sub-ctrl2';

//var ip = require("ip");
//sub_arr[count++].nu = conf.useprotocol + '://' + ip.address() + ':' + ae.port + '/noti';

//sub_arr[count++].nu = 'mqtt://' + cse.host + '/' + ae.id + '?rcn=9';
//sub_arr[count++].nu = 'mqtt://' + cse.host + '/' + ae.id + '?ct=' + ae.bodytype;
//var ip = require("ip");
//sub_arr[count++].nu = 'http://' + ip.address() + ':' + ae.port + '/noti';
//sub_arr[count++].nu = 'coap://203.254.173.104:' + ae.port + '/noti';

// build acp: not complete
//acp.parent = '/' + cse.name + '/' + ae.name;
//acp.name = 'acp-' + ae.name;
//acp.id = ae.id;


conf.usesecure  = 'disable';

if(conf.usesecure === 'enable') {
    cse.mqttport = '8883';
}

conf.cse = cse;
conf.ae = ae;
conf.cnt = cnt_arr;
conf.sub = sub_arr;
conf.acp = acp;


module.exports = conf;
