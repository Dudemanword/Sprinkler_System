require('./emitty.js')(events)
var event = require('events');
var test = new event.EventEmitter()

test.emit('test');
