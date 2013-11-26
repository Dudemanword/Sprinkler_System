/********************************************************************
Script is created to test emiiters with asynchronous behavior. If a STOP is emitted, function enters stopfunc.
Else if !STOP is emiited, function enters notstopfunc
********************************************************************/

var events = require('events');
eventEmitter = new events.EventEmitter();

eventEmitter.on('STOP', stopfunc);
eventEmitter.on('!STOP', notstopfunc);


function testJob(start, stop){
	this.start = start;
	this.stop = stop;
	this.startTime(function(isCreated){
		console.log(isCreated);
	});
}

testJob.prototype.startTime = function(callback){
	var end = this.stop - this.start;
	var start = +new Date();
	console.log('in job');
	var intervalID = new setInterval(function(){stopTime(start, end,function(stop, timer){
		console.log('stop is ' + stop);
		if(stop){ 
			clearInterval(intervalID);
			eventEmitter.emit('STOP');
			}
		else{
			eventEmitter.emit('!STOP');
			}
		})
	}, 1000);
	callback('Job created');
}

function notstopfunc(){
	console.log('in notstopfunc');
}

function stopfunc(){
	console.log('in stopfunc')
}

function stopTime(start, end, callback){
	var stop = +new Date;
	console.log('Time elapsed is ' + (stop-start));
	console.log(end)
	if((stop - start) >= end) callback(1)
	
	else{
		callback(0)
	}
}
