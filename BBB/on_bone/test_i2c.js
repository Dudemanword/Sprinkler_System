var bone = require('bonescript')
var i2c = require('i2c')

var rtc_address = 0x68;
var si7005_address = 0x40;

var wire = new i2c(si7005_address, {device: '/dev/i2c-1/', debug: true});
console.log('Created connection to si7005');
wire.writeBytes(0x01, [0x40,0x0,0x03,0x01,0x0], function(err){
	console.log(err);
	wire.writeBytes(0x01,[0x40,0x01,0x40], function(err){
		wire.readBytes(0x0,2, function(err, res){
			console.log(res);
		});
	});
});	
