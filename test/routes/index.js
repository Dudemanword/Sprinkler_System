
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req,res){
	res.render('helloworld', {title: 'Hello, World!'});
};

exports.buttons = function(req, res){
	res.render('testbuttons', {title: 'Buttons and other various feature test'});
};
