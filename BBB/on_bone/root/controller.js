var b = require('bonescript');
var outpin = 'P9_12';
var out = 0;

b.pinMode('P9_12', b.OUTPUT);

function swappy() {
	if (out == 0)
	{
		b.digitalWrite('P9_12', b.LOW, 7);
		out = 1;
	}
	else
	{
		b.digitalWrite('P9_12', b.HIGH, 7);
		out = 0;
	}
}


setInterval(swappy, 50);

