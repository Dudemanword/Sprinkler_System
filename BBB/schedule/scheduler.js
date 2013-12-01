var cronJob = require('cron').CronJob; 
/*syntax: var job = new cronJob(cronstuffs, function(){
		what I need to run},function(){
			If I need to run stuff after the job is done}, true,timezone );*/
var controller

function scheduler (control_name){
	controller = control_name
}

scheduler.prototype.createEvent= function(type, jsonIn, callback){
//function (type, jsonIn, callback){
	json = JSON.parse(jsonIn);
	switch (type.toLowerCase()){
		case 'once':
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + json.day + ' ' + json.month + ' ' + json.dayofweek, function(){
				console.log('In Once');
					}, function(){job.stop()}
			);
			job.start();
			callback('schedule created');
			break

		case 'odd':
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + '1-31/2 ' + json.month + ' *', function(){
				//Do whatever I need to do to execute the controller
				console.log('In Odd');
				}
			);
			job.start();
			callback('schedule created');
			break
	
		case 'even':
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + '0-30/2 ' + json.month + ' *', function(){
				console.log('In Even');
				}
			);
			job.start();
			callback('schedule created');
			break

		case 'daily':
			var job = new cronJob(json.minute + ' ' + json.hour + ' * * *', function(){
				console.log('Daily')
				}
			);
			job.start();
			callback('schedule created');	
			break

		case 'ndays':
			var div = json.ndays
			if (div > 0){
				var hour = json.hour + '/' + div
				var job = new cronJob(json.minute + ' ' + hour + '* * *', function(){
					console.log('in ndays')
					});
				}
			job.start();
			callback('schedule created');
			else
				callback('ndays is less than or equal to zero');
			break

		case 'days':
			var job = new cronJob(json.minute + ' ' + json.hour + ' * ' + json.month + ' ' + json.dayofweek, function(){
				console.log('In Days');
				}
			);
			job.start();
			callback('schedule created');
			break

		case 'now':							/*Need to add a way to stop the job once completion has been detected, goes 											  in the second function block */
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + json.month + ' ' + json.dayofweek, function(){
				controller();
				console.log('In Now')
			}, function(){job.stop}, true);
			callback('schedule created');			
			break
		
		case 'special':
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + json.month + ' ' + json.dayofweek,function(){
				controller();
			});
			job.start()	
			callback('schedule created');
			break
	}
	
	
}
testjson1 = '{"minute": "02", "hour": "11","day": "11", "month": "Oct", "dayofweek": "Fri"}';

var sprink = new scheduler('sprinkler');
sprink.createEvent('Once', testjson1, function(isDone){
		console.log(isDone);
	}
);

var sprink2 = new scheduler('sprinks');
testjson2 = '{"minute": "*", "hour": "*", "day": "*", "month": "*", "dayofweek": "*"}';
sprink2.createEvent('special', testjson2, function(isDone){
		console.log(isDone + ' func 2');	
	}
);
		
	 
