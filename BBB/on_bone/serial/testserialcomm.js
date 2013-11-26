var xbee = require('svd-xbee');
var parser = require('./parser.js');
var util = require('util');

var remote_arr = []
var node_arr = []
	

function create_node(node){
	begin = remote_arr.length
	create_node['name' + begin] = xbeecoord.addNode(node.hex_identifier);
	node_arr.push(create_node['name' + begin]);
	console.log(node_arr);
}

var xbeecoord = new xbee.XBee({port: '/dev/ttyO4', baudrate: 9600, api_mode: 1}).init();

console.log('here');

xbeecoord.on('initialized', function(params){
	console.log('initialized with params: ' + util.inspect(params));
	xbeecoord.discover();
});

xbeecoord.on('discoveryEnd',function(){
	xbeecoord.discover();
});

xbeecoord.on('newNodeDiscovered',function(node){
	obj = {'id':node.id,'hex_identifier':node.remote64.hex,'created':0}
	console.log(typeof(obj.hex_identifier))
	remote_arr.push(obj)
	create_node(obj)
	
});

