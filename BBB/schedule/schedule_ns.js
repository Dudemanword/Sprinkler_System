var schedule = require('node-schedule');
var bone = require('bonescript');

var controller
var dateRule

function scheduler(controller_object, dateRuleObj){
	controller = controller_object;
	dateRule = dateRuleObj;
}

scheduler.prototype._getDate = function(callback){
	date = new Date();
	year = date.getFullYear();
	month = date.getMonth();
	_date = date.getDate();
	day = date.getDay();
	time = date.getTime();
	dateObj = {"year":year, "month":month, "day":day,"time":time, "date":_date}
	callback(dateObj);
}

scheduler.prototype.createEvent = function(callback){
	this._getDate(function(dateObj){
		switch(dateRule.special.toLowerCase()){

			case 'even':
				console.log(dateObj);
				if(!(dateObj.date % 2)){
					sched_date = new Date(dateObj.year, dateObj.month, dateObj.date, dateRule.hour, dateRule.minute);
					job = schedule.scheduleJob(sched_date, function(){
						controller();
					});
					callback(job);														
				}
				else
					callback('Not an Even Day');
				break;

			case 'odd':
				if(dateObj.date % 2){
					sched_date = new Date(dateObj.year, dateObj.month, dateObj.date, dateRule.hour, dateRule.minute);
					console.log(sched_date);
					job = schedule.scheduleJob(sched_date, function(){
						controller();
					});
					callback(job);														
				}
				else
					callback('Not an Odd Day');
				break;
					
			default:
				console.log('something went wrong');
		}
	});
		
	
}

function testJob(){
	setInterval(function(){
		bone.digitalWrite('P8_41', bone.HIGH);
		setInterval(function(){
		bone.digitalWrite('P8_41', bone.LOW);}, 1000);
		,2000)};
	}


sched = new scheduler(function(){testJob()}, {"special": 'even', "hour" : 1, "minute":28});
sched.createEvent(function(callback){console.log(callback)});

	
