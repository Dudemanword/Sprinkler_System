var i2c = require('i2c');
var event = require('events');
var bone = require('bonescript')

adjustor = new event.EventEmitter();

var si7005_address = 0x40;

var temp_obj, type, zone;

adjustor.on('CLOSE', function(){
	bone.digitalWrite(zone,0);
});

adjustor.on('OPEN', function(){
	bone.digitalWrite(zone,1);
});

function si7005(_type, zone_pin, condition_obj){;
	type = _type;
	temp_obj = new i2c(si7005_address, {device: '/dev/i2c-1', debug: false});
}

function open(zone){
	bone.digitalWrite(zone, 1);
}

function close(zone){
	bone.digitalRead(zone,0)
}

si7005.prototype.scanCondition = function(condition_object){
	zone = condition_object.zone;
	type = condition_object.type;
	self = this;
	var intervalID = setInterval(self.getResults(function(res){
		switch(condition_object.action){
			case 'open':
				emit_stuff(condition_object.val, res,'OPEN', function(emitBool){
					if (emitBool) clearInterval(intervalID);
				});
				break
			case 'close': 
				emit_stuff(condition_object, res,'CLOSE', function(emitBool){
					if (emitBool) clearInterval(intervalID);
				});
			}
		}), 1000);
} 
si7005.prototype.getResults = function(callback){
	var conv_type
	if (type.match(/temp/i)) conv_type = 0x11; 
	else if (type.match(/hum/i)) conv_type = 0x01;
	else callback('Cannot read input type. Did you mean temp or humid?...moron');
	temp_obj.writeBytes(0x03,[conv_type],function(err){
	console.log(err);
	temp_obj.readBytes(0x01, 2, function(err, res){
		console.log('Conversion Results')		
		if(conv_type == 0x11 ) callback(temp_conversion(res));
		else if (conv_type == 0x01) callback(humid_conversion(res))
		else callback('Did not return anything');
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

function emit_stuff(condition,res,type,callback){
	var bool = 0;
	val = condition.val;
	switch(condition.condition){
		case 'less':
			if(res < val){bool = 1; event.emit(type);}
			break
		case 'more':
			if(res > val) {bool = 1; event.emit(type);}
			break
		case 'exactly':
			if(Math.abs(res - val) <= 2) {bool = 1; event.emit(type);}
			break
	}
	callback(bool);
}
temp = new si7005('temp')
temp.getResults(function(res){
	console.log('Temp results ' + res);
});

humid = new si7005('temp')
setTimeout(humid.getResults(function(res){
	console.log('Humid results ' + res);
}), 50)
