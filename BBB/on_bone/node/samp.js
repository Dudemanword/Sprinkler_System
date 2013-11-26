var bone = require('bonescript')

bone.pinMode('P8_41', bone.OUTPUT);
bone.pinMode('P8_8', bone.OUTPUT);

pin2 = 'P8_8'
pin = 'P8_41'
function testJob(callback){
	setInterval(function(){
		setTimeout(function(){
			bone.digitalWrite(pin, bone.HIGH);
			setTimeout(function(){
				console.log('Hello');
				bone.digitalWrite(pin, bone.LOW);}, 100);
			},500);}, 600);
	callback('Holla back');
}

function testJob2(callback){
	setInterval(function(){
		setTimeout(function(){
			bone.digitalWrite(pin2, bone.HIGH);
			setTimeout(function(){
				console.log('Idiots')
				bone.digitalWrite(pin2, bone.LOW);}, 1000);
			},2000);}, 3000);
	callback('Gurl')
}

testJob(function(lame){
	console.log(lame);
	});


testJob2(function(lamer){
	console.log(lamer);
	});

