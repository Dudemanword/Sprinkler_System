//Code configures pins for WiFly module and tests connection
//Tx: Uses Pin 13(spi0_d0) and muxes it to Mode 1(uart2_txd) NEED TO CHANGE THE MUX MODE
//Rx: Uses Pin 11(spi0_sclk2) and muxes it to Mode 2(uart2_rxd) NEED TO CHANGE THE MUX MODE
//Uses the serialport node library.

var bone = require('bonescript');

bone.pinmode('P9_13', bone.INPUT, 1, 'pullup','fast');
bone.pinmode('P9_11', bone.OUTPUT, 1, 'pullup', 'fast');

//Create a Serial Terminal to communicate with the WiFly Module
var sp = require('serialport').SerialPort;
var wifly = new sp('/dev/tty/ttyO4',{baudrate: 9600, databits: 8, stopbits: 1, parity: 'none'); //Need to do some fancy mods to actually get the tty working

//Opens function. Due to the asynchronous nature of opening the serial port, I wait in this function until the connection is establused and SOME type of data is received.
wifly.on('open', function(){
	wifly.on('data', function(data){
		console.log('data received ' + data);
		})
	});

