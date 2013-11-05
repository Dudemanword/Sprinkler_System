var sys = require('sys')
var fs = require('fs')
var exec = require('child_process').exec

var connJSON

function terminal_output(command, callback){
	exec(command, function(error, stdout, stderr){
		callback(error, stdout, stderr);
	});
}

function wireless_connect(jsonIn){
	connJSON = jsonIn
} 

wireless_connect.prototype.connect = function(callback){
	terminal_output('rm /var/run/wpa_supplicant/wlan0', function(error, stdout, stderr){
		console.log('wlan0 removed');
	});
	

	if (connJSON.security.match(/WEP/)){
		var stream = fs.createWriteStream("./wpa_supplicant.conf");
		stream.once('open', function(close){
			stream.write('ctrl_interface=/var/run/wpa_supplicant\n');
			stream.write('ctrl_interface_group=0\n');
			stream.write('update_config=1\n');
			stream.write('network={\n');
			stream.write('\tssid="'+connJSON.ssid+'"\n');
			stream.write('\tkey_mgmt=NONE\n');
			stream.write('\twep_key0='+connJSON.password+'\n');
			stream.write('}')
			stream.end();
			current_date = new Date();
			current_time = current_date.getTime();
			terminal_output('wpa_supplicant -Dwext -iwlan0 -c ./wpa_supplicant.conf -B', function(error, stdout, stderr){
				console.log('Is it hanging...?');
				setInterval(function(){
					now_date = Date();
					now_time = now_date.getTime();
					if(now_time - current_time > 45000){
						throw 'Cannot connect to network. Check your settings and try again';
						}
					}, 2000);
				terminal_output('udhcpc -i wlan0', function(error, stdout, stderr){
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
			console.log('HERE');
			if(connJSON.security.match(/PSK/)){
				stream.write('\tpsk="'+connJSON.password+'"\n');
			}
			if(connJSON.group){
				stream.write('\tgroup='+connJSON.group+'\n');
			}
			stream.write('}');
			stream.end();
			terminal_output('wpa_supplicant -Dwext -iwlan0 -c ./wpa_supplicant.conf -B', function(error, stdout, stderr){
				console.log(error, stdout, stderr);
				terminal_output('udhcpc -i wlan0', function(error, stdout, stderr){
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
//var JSONin = {"ssid":"traegalia","password":"ADAB1C21BD82347205BB3B0157","security":"WPA-PSK"};
var Connect = new wireless_connect(JSONin)
Connect.connect();			
