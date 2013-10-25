var sys = require('sys')
var fs = require('fs')
var exec = require('child_process').exec

var connJSON
var connType;

function terminal_output(command, callback){
	exec(command, function(error, stdout, stderr){
		callback(stdout);
	});
}

function wireless_connect(jsonIn, type){
	connJSON = JSON.parse(jsonIn);
	connType = type;
} 

wireless_connect.prototype.connect = function(callback){
	if (connType == 'DHCP'){
		terminal_output('wpa_cli add_network		
		
