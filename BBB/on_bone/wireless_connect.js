var sys = require('sys')
var fs = require('fs')
var exec = require('child_process').exec
var spawn = require('child_process').spawn


var connJSON

function terminal_output(/*command,options,callback*/){

	_default = { encoding: 'utf8', timeout: 0,maxBuffer: 200*1024,killSignal: 'SIGTERM',cwd: null,env: null }

	command = arguments[0];

	console.log('type of argument is ' + typeof arguments[2])

	if((typeof arguments[1]) == 'object'){
		options = arguments[1];
		callback = arguments[2];
	}

	else if ((typeof arguments[1]) == 'function'){
		options = _default;
		callback = arguments[1];
	}
	
	else
		callback(new Error ('Give me some legit parameters...'));

	exec(command,options, function(error, stdout, stderr){
		callback(error, stdout, stderr);
	});
}

function wireless_connect(jsonIn){
	connJSON = jsonIn
} 

wireless_connect.prototype.connect = function(callback){
	terminal_output('sudo /usr/bin/killall wpa_supplicant', function(error, stdout, stderr){
		console.log('wlan0 removed');
	});
	

	if (connJSON.security.match(/WEP/)){
		var stream = fs.createWriteStream("./wpa_supplicant.conf");
		stream.once('open', function(close){
			stream.write('ctrl_interface=/var/run/wpa_supplicant\n');
			
stream.write('ctrl_interface_group=0\n');
//stream.write('ctrl_interface_group=nodectrl\n');
			stream.write('update_config=1\n');
			stream.write('network={\n');
			stream.write('\tssid="'+connJSON.ssid+'"\n');
			stream.write('\tkey_mgmt=NONE\n');
			stream.write('\twep_key0='+connJSON.password+'\n');
			stream.write('}')
			stream.end();
			terminal_output('sudo /usr/sbin/wpa_supplicant -Dwext -iwlan0 -c ./wpa_supplicant.conf -B', function(error, stdout, stderr){
				console.log('Is it hanging...?');
				terminal_output('sudo /sbin/udhcpc -i wlan0', function(error, stdout, stderr){
					console.log('Please do not hang :3')
				});
			});
		});
	}

	if (connJSON.security.match(/WPA/)){
		var stream = fs.createWriteStream('./wpa_supplicant.conf');
		stream.once('open', function(close){
			stream.write('ctrl_interface=/var/run/wpa_supplicant\n');
			stream.write('ctrl_interface_group=0\n');
			stream.write('update_config=1\n');
			stream.write('network={\n');
			stream.write('\tssid="'+connJSON.ssid+'"\n');
			stream.write('\tkey_mgmt='+connJSON.security+'\n');
			if (connJSON.security.match(/EAP/)){
				stream.write('\teap='+connJSON.special+'\n');
				stream.write('\tidentity="'+connJSON.username+'"\n');
				stream.write('\tphase2="autheap='+connJSON.eaptype+'"\n');
				stream.write('\tpassword="'+connJSON.password+'"\n');
			}
			if (connJSON.bssid)
				stream.write('\tbssid='+connJSON.bssid+'\n');
			if(connJSON.security.match(/PSK/)){
				stream.write('\tpsk="'+connJSON.password+'"\n');
			}
			if(connJSON.group){
				stream.write('\tgroup='+connJSON.group+'\n');
			}
			stream.write('}');
			stream.end();
			terminal_output('sudo /usr/sbin/wpa_supplicant -Dwext -iwlan0 -c ./wpa_supplicant.conf -B',{ encoding: 'utf8',timeout: 40000,maxBuffer: 200*1024,killSignal: 'SIGTERM',cwd: null,env: null }, function(error, stdout, stderr){
				console.log(error, stdout, stderr);
				if(error | stderr) throw error;
				terminal_output('sudo /sbin/udhcpc -t 3 -i wlan0' ,{ encoding: 'utf8',timeout: 30000,maxBuffer: 200*1024,killSignal: 'SIGTERM',cwd: null,env: null }, function(error, stdout, stderr){
					console.log(error, stdout, stderr);
					console.log('Please do not hang :3');
				});
			});
		});
	}
}
module.exports = wireless_connect
//Test the module
//var JSONin = {"ssid":"RajNetwork","password":"e65d7a1414e6e34bc874ebdb69", "security":"WEP"}
var JSONin = {"ssid":"traegalia","password":"ADAB1C21BD82347205BB3B0156","security":"WPA-PSK"};
//var JSONin = {"ssid":"UCCS-Wireless","username":"sraj2", "password":"Iwashere1234", "special":"PEAP", "eaptype":"GTC", "security":"WPA-EAP"};
var Connect = new wireless_connect(JSONin)
Connect.connect();
/*setInterval(function(){
	console.log('Here we be waiting...AAARGH!');}, 2000);*/
