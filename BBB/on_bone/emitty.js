var events = require('events');
var event = new events.EventEmitter();

event.on('test', testfunc)



//module.exports = event;
module.exports = function testfunc(events){
	console.log('In testfunc');
}
