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
				dates = [];
				for (var date = 1; date <= 31; date ++){
						if (date%2)
							dates.push(date);
				}
				rule = new schedule.RecurrenceRule();
				rule.date = dates;
				rule.minute = dateRule.minute;
				rule.hour = dateRule.hour;
				console.log(dateObj)
				job = schedule.scheduleJob(rule, function(){
					controller();
				});
				callback(job);														
				break;

			case 'odd':
				dates = [];
				for (var date = 1; date <= 31; date ++){
						if (!(date%2))
							dates.push(date);
				}

				rule = new schedule.RecurrenceRule();
				rule.date = dates;
				rule.minute = dateRule.minute;
				rule.hour = dateRule.hour;

				job = schedule.scheduleJob(rule, function(){
					controller();
				});
				callback(job);														

				break;

			case 'now':
				sched_date = new Date(dateObj.year, dateObj.month, dateObj.date, dateObj.hour, dateObj.minute);
				console.log(sched_date);
				job = schedule.scheduleJob(sched_date, function(){
					controller();
				});
				callback(job);
				break;ssa
					
			case 'n_days':
				rule = new schedule.RecurrenceRule();
				for (var date = 1; date <= 31; date ++){
						if (date%(dateRule.n_day))
							dates.push(date);
				}
				rule = new schedule.RecurrenceRule();
				rule.date = dates;
				rule.minute = dateRule.minute;
				rule.hour = dateRule.hour;
				job = schedule.scheduleJob(rule, function(){
					controller();
				});
				callback(job);

				break;

		case 'monthly':
				rule = new schedule.RecurrenceRule();
				rule.date = dateRule.date;
				rule.minute = dateRule.minute;
				rule.hour = dateRule.hour;
				job = schedule.scheduleRule(rule, function(){
					controller();
				});
	
				callback(job);
				
				break;
	
		case 'once':
				sched_date = new Date(dateRule.year, dateRule.month, dateRule.date, dateRule.hour, dateRule.minute);
				job = schedule.scheduleRule(sched_date, function(){
					controller();
				});

				callback(job);

				break;

		case 'weekly':
				dayweek = [];
				rule = new schedule.RecurrenceRule();
				for (days) in (dateRule.dayofweek){
						if (days == 'sunday')
							dayweek.push(0);
						if (days == 'monday')
							dayweek.push(1);
						if (days == 'tuesday')
							dayweek.push(2);
						if (days == 'wednesday')
							dayweek.push(3);
						if(days == 'thursday')
							dayweek.push(4);
						if(days == 'friday')
							dayweek.push(5);
						if(days == 'saturday')
							dayweek.push(6);

				rule.dayOfWeek = dayweek;
				rule.hour = dateRule.hour;
				rule.minute = dateRule.minute;
			
				job = schedule.scheduleRule(rule, function(){
					controller();
				});

				callback(job)

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
		},2000);
		console.log('in job');
	}


sched = new scheduler(function(){testJob()}, {"special": 'odd', "hour" : 17, "minute":30});
sched.createEvent(function(callback){console.log(callback)});

	
