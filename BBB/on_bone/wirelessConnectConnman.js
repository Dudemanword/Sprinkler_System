	var sys = require('sys')
var fs = require('fs')
var exec = require('child_process').exec
var spawn = require('child_process').spawn


var connJSON


function wireless_connect(jsonIn){
	connJSON = jsonIn
} 

wireless_connect.prototype.getConnmanKey = function(ssid,callback){
	exec('/usr/lib/connman/test/test-connman services', function(error, stdout, stderr){
		console.log(stdout);
		if(stdout.match(ssid)){
			stdout_regex = new RegExp (ssid + '\\s+{ [a-zA-Z0-9_]+ }','g')
			console.log(stdout.match(stdout_regex).toString())
			callback(stdout.match(stdout_regex).toString())
		}
	});
}
wireless_connect.prototype.connect = function(callback){
		this.getConnmanKey(connJSON.ssid,function(wireless_key){
			console.log(wireless_key);
			if (wireless_key == null) callback('SSID not in range');
			else{
				wireless_key = wireless_key.replace(connJSON.ssid,'').replace(/{\s/g,'')
				var stream = fs.createWriteStream('/var/lib/connman/wifi.config');
					stream.once('open', function(close){
					stream.write('[service_home]\n');
					stream.write('Type = wifi\n');
					stream.write('Name = ' + connJSON.ssid + '\n');
					stream.write('Security ='+connJSON.security+'\n');
					stream.write('Passphrase = ' + connJSON.password + '\n');
					stream.end();
				});
				exec('/usr/lib/connman/test/test-connman connect ' + wireless_key,function(){});
			}
		});	
	}	
}	

module.exports = wireless_connect
//Test the module
//var JSONin = {"ssid":"RajNetwork","password":"e65d7a1414e6e34bc874ebdb69", "security":"WEP"}
var JSONin = {"ssid":"traegalia","password":"ADAB1C21BD82347205BB3B0156","security":"WPA-PSK"};
//var JSONin = {"ssid":"UCCS-Wireless","username":"sraj2", "password":"Iwashere1234", "special":"PEAP", "eaptype":"GTC", "security":"WPA-EAP"};
var Connect = new wireless_connect(JSONin)
Connect.connect(function(didConnect){
	console.log(didConnect);
});
/*setInterval(function(){
	console.log('Here we be waiting...AAARGH!');}, 2000);*/
