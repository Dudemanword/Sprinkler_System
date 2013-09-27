var sql = require('/home/shaun/senior_design_project/sqlite3/create_tables.js');
console.log(sql)
var db = new sql('measurement.db')

db.init_db();
db.insert('humidity', [90, 1380316237]);
db.create_table('Shaun2', ['col1', 'col2', 'colooooh'],['INT PRIMARY KEY', 'INT']);
console.log('afters...');
