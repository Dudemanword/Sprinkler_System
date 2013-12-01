var xbee = require('./xbee_comm')

var stuff = new xbee('/dev/ttyO4')

stuff.init(function(things){
	console.log(things);
		for (remote in things){
			if('REMOTEONE' == things[remote].id){
				stuff.write(things[remote].hex_identifier, 'DIO2','DIGITAL_OUTPUT_HIGH', function(node){
					stuff.read(things[remote].hex_identifier,'DIO2', function(res){
						console.log(res);
						stuff.write(things[remote].hex_identifier, 'DIO2', 'DIGITAL_OUTPUT_LOW',function(node){console.log('writing 2')});
					});
				});
			}
		}		
});
