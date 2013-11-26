var exec = require('child_process').exec

function terminal_output(command, callback){
	exec(command, function(error, stdout, stderr){
		callback(error, stdout, stderr);
	});
}

var timedate

function setTimeDate(timestamp){
	timedate = timestamp;
}

setTimeDate.set = function(callback){
	terminal_output('date -s @'+timedate, function(error, stdout, stderr){
		if (error) throw error;
		callback('done')
	)};
}
	
