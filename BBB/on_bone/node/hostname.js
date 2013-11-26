var exec = require('child_process').exec

function terminal_output(command, callback){
	exec(command, function(error, stdout, stderr){
		callback(error, stdout, stderr);
	});
}

function change_hostname(hostname, callback){
	terminal_output('hostname ' + hostname, function(err, stdout, stderr){
		callback('done')
	});
}
