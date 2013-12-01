var Events
a = require('./emitty.js')(Events)

console.log (a)
var events = require('events');
var event = new events.EventEmitter();
//var emits = require('./emit.js');
event.on('test',a)

emit('test');
