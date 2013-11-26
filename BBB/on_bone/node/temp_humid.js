/*
Temperature/Humidity Controller for si7005. This is built assuming the si7005 is connected to pin 19/20 of the BBB and the pins are muxed for I2C comms
Example Usage is shown Below

temp = new si7005('temp')
temp.getResults(function(res){
	console.log('Temp results ' + res);
});

Temperature returned is in CELSIUS. Conversion to Fahrenheit/Kelvin will be needed

humid = new si7005('temp')
humid.getResults(function(res){
	console.log('Humid results ' + res);
});

Humidity returned is in PERCENT RELATIVE HUMIDITY
*/

var i2c = require('i2c')

var si7005_address = 0x40;

var temp_obj
var type

function si7005(_type){
	type = _type;
	temp_obj = new i2c(si7005_address, {device: '/dev/i2c-1', debug: true});
}

si7005.prototype.getResults = function(callback){
	var conv_bool = 0;
	if (type.match(/temp/i)){ conv_type = 0x11; conv_bool = 1;}
	else if (type.match(/hum/i)) conv_type = 0x01;
	else callback('Cannot read input type. Did you mean temp or humid?...moron');
	temp_obj.writeBytes(0x03,[conv_type],function(err){
	console.log(err);
	temp_obj.readBytes(0x01, 2, function(err, res){
		console.log('Conversion Results')		
		if(conv_bool) callback(temp_conversion(res));
		else callback(humid_conversion(res))
		});
	});
}

function temp_conversion(buff,callback){
	temp_hex = buff.readInt16BE(0);
	res_celsius = [temp_hex >> 2]/32.0 - 50;
	return(res_celsius);
}

function humid_conversion(buff, callback){
	humid_hex = buff.readInt16BE(0);
	console.log(buff);
	humid = [humid_hex >> 4]/16.0 - 24
	return(humid)
}

module.exports = si7005;
temp = new si7005('temp')
temp.getResults(function(res){
	console.log('Temp results ' + res);
});


