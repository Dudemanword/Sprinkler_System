//Code configures pins for WiFly module and tests connection
//Tx: Uses Pin 21(spi0_d0) and muxes it to Mode 1(uart2_txd)
//Rx: Uses Pin 22(spi0_sclk2) and muxes it to Mode 2(uart2_rxd)
//Uses the serialport node library...haven't installed it on my BBB quite yet...

var bone = require('bonescript');

bone.pinmode('P9_21', bone.INPUT, 1, 'pullup','fast');
bone.pinmode('P9_22', bone.OUTPUT, 1, 'pullup', 'fast');

//Create a Serial Terminal to communicate with the WiFly Module
var sp = require('serialport').SerialPort;
var wifly = new sp('/dev/tty/ttyO1'); //Need to do some fancy mods to actually get the tty working



