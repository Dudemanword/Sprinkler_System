var fs = require('fs')


function terminal_output(command, callback){
	exec(command, function(error, stdout, stderr){
		callback(error, stdout, stderr);
	});
}

function config_interface(objIn){
	if (objIn.type.toLowerCase() == 'dhcp'){
		terminal_output('cp ./interfaces_dhcp ./interfaces', function(error, stdout, stderr){
			console.log(error, stdout, stderr);
			terminal_output('sudo mv ./interfaces /etc/network/interfaces', function(error, stdout, stderr){
				console.log(error, stdout, stderr);
				});
			});
	}
	
	else if(objIn.type.toLowerCase() == 'static'){
		fs.readFile('./interfaces_static', 'utf8',function(err,interfaces_static){
			first_rep = interfaces_static.replace(/(address\s([0-9]{1,3}.){3}[0-9]{1,3})/, 'address ' + objIn.address);
			sec_rep = first_rep.replace(/(netmask\s([0-9]{1,3}.){3}[0-9]{1,3})/, 'netmask ' + objIn.netmask);
			third_rep = sec_rep.replace(/(network\s([0-9]{1,3}.){3}[0-9]{1,3})/, 'network ' + objIn.network);
			final_rep = third_rep.replace(/(gateway\s([0-9]{1,3}.){3}[0-9]{1,3})/, 'gateway ' + objIn.gateway);
			fs.writeFile('interfaces',final_rep, 'utf8',function(err){
				if (err) throw err
				else console.log('Saved!')
				}); 
		});
	}	
}
objIn = {"type": "static", "address":"test1", "netmask":"test2", "network":"test3", "gateway":"test4"};
config_interface(objIn)
