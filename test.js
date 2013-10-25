var http = require('http');
 
http.get('http://registry.npmjs.org/mysql2', function(res) {
  console.log('Got response: ' + res.statusCode);
  res.resume();
}).on('error', function(e) {
  console.log('Got error: ' + e.message);
});
