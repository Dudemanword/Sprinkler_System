var bone = require('bonescript');

function controller(){
	//Construct pin info from JSON
	//Scehduler Control...look at using node-scheduler or communicating with cron daemon
	//Instantiate XBEE <- Seperate class...? Prolly...node-serialport
	//Accepts db namespace/object
	//Determine whether to use RTC Or onboard clock
	//Poll database schedule thing and reconstructs the above
}

/*Methods...?
-accept pin number, and direction and send data to datapath
-Log data: stdout/returns
-Pin status function
-function that lists outputs and inputs
