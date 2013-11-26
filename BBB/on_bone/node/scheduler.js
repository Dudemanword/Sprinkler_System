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
	switch (type){
		case 'Once':
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + json.day + ' ' + json.month + ' ' + json.dayofweek, function(){
				controller(function(callback){
					console.log(callback);});
					}, function(){job.stop()}
			);
			job.start();
			callback('schedule created');
			break

		case 'Odd':
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + '1-31/2 ' + json.month + ' *', function(){
				//Do whatever I need to do to execute the controller
				console.log('In Odd');
				}
			);
			job.start();
			callback('schedule created');
			break
	
		case 'Even':
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + '0-30/2 ' + json.month + ' *', function(){
				console.log('In Even');
				}
			);
			job.start();
			callback('schedule created');
			break

		case 'Daily':
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
			break

		case 'Days':
			var job = new cronJob(json.minute + ' ' + json.hour + ' * ' + json.month + ' ' + json.dayofweek, function(){
				console.log('In Days');
				}
			);
			job.start();
			callback('schedule created');
			break

		case 'Now':							/*Need to add a way to stop the job once completion has been detected, goes 											  in the second function block */
			var job = new cronJob(json.minute + ' ' + json.hour + ' ' + json.month + ' ' + json.dayofweek, function(){
				console.log('In Now')
			}, function(){job.stop}, true);
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
sprink2.createEvent('Once', testjson2, function(isDone){
		console.log(isDone + ' func 2');	
	}
);

function testJob(callback){
	setInterval(function(){
		setTimeout(function(){
			pin = 'P8_41'
			bone.digitalWrite(pin, bone.HIGH);
			setTimeout(function(){
				console.log('Hello');	
				bone.digitalWrite(pin, bone.LOW);}, 2000);
			},1000);}, 3000);
	callback('Holla back');
}

function testJob2(callback){
	setInterval(function(){
		setTimeout(function(){
			pin2 = 'P8_8'
			bone.digitalWrite(pin2, bone.HIGH);
			setTimeout(function(){
				console.log('Idiots')			
				bone.digitalWrite(pin2, bone.LOW);}, 1000);
			},2000);}, 3000);
	callback('Gurl')
}		

var switchy = new scheduler(testJob)
testjson2 = '{"minute": "*", "hour": "*", "day": "*", "month": "*", "dayofweek": "*"}';
switchy.createEvent('Once', testjson2, function(isDone){
	console.log(isDone);
});
