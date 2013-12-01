var events = require('events');
//var emit = require('./emit.js');

var event = new events.EventEmitter();

function testfunc(){
	console.log('In testfunc')
}

//module.exports = event;
module.exports = function(Events) {
	testfunc;
}
