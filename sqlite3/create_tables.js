var fs = require('fs');
var sqlite3 = require('sqlite3')
var database;
var exists;

function db_management(_name){
	var db = new sqlite3.Database(_name);	
	var existss = fs.existsSync(_name); //Checks if the file exists. Useful to check if initial db creation needs to be done.
	exists = existss
	database = db;
	//this.exists = exists
	//this.db = db;
	console.log(db);
}

db_management.prototype.init_db = function(){
	console.log(database, exists);
	database.serialize(function(){
			if(!exists){
				console.log('Creating Databases');
				database.run('CREATE TABLE temperature (Temp INT, Time INT PRIMARY KEY)');
				database.run('CREATE TABLE humidity (Humidity INT, Time INT PRIMARY KEY)');
				return 1;
				}
			return 0;
			});
			}

db_management.prototype.insert = function(table, info){
	if(table == 'temperature'){
		database.run('INSERT INTO ' + table + '(Temp, Time) VALUES(' + info[0] + ',' + info[1] + ')');
		}
	if(table == 'humidity'){
		database.run('INSERT INTO ' + table + '(Humidity, Time) VALUES(' + info[0] + ',' + info[1] + ')');
			}d
}

//Expected input: db_managment.create_table(tabname,[col1,col2,...], [dat1,dat2,...]) column.length MUST EQUAL datatypes.length)
db_management.prototype.create_table = function(tablename, column, datatypes){
	if(column.length != datatypes.length){
		throw 'Column name length and data type length do not match...idiot...';
	}
	sql = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' (';	
	for (var dbiter = 0; dbiter < column.length; dbiter ++){
		if (dbiter == (column.length - 1))
			var end = '';
		else
			var end = ',';

		sql = sql + column[dbiter] + ' ' + datatypes[dbiter] + end;

	}
	sql = sql + ")";
	console.log(sql)
	database.run(sql);
}

db_management.prototype.drop_table = function(tablename){
	database.run('DROP TABLE ' + tablename);
	}

db_management.prototype.query = function(tablename, colname, mode, num1, num2){
	if (mode == 'all'){
		out = database.run('SELECT * FROM ' + tablename);
		return out;
		}
	if (mode == 'range'){
		out = database.run('SELECT * FROM ' + tablename 'WHERE ' + colname + '>= ' + num1 'AND' colname '<= ' + num2 );
		return out;
	}
}

