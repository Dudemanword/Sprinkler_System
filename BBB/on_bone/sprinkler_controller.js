var sched;
var bone = require('bonescript');


var zone_lookup = {'zone_1': 'P8_16','zone_2': 'P8_16','zone_3': 'P8_16','zone_4': 'P8_16','zone_5': 'P8_16','zone_6': 'P8_16','zone_7': 'P8_16','zone_8': 'P8_16','zone_9': 'P8_16','zone_10': 'P8_16','zone_11': 'P8_16','zone_12': 'P8_16','zone_13': 'P8_16','zone_14': 'P8_16','zone_15': 'P8_16','zone_16': 'P8_16'};

function sprink_controller(schedule){
	sched = schedule;
	}
sprink_controller.prototype.create_job = function(zones){
	for (zone in zones){
		bone.digitalWrite(zone_lookup.zone
	
sprink_contoller.prototype.schedule = function(callback){
	
