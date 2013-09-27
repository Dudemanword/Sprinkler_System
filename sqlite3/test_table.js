var sql = require('/home/shaun/senior_design_project/sqlite3/create_tables.js');
console.log(sql)
var db = new sql('measurement.db')

db.init_db();
db.insert('humidity', [90, 1380316231]);
db.create_table('Shaun4', ['col1', 'col2', 'colooooh'],['INT PRIMARY KEY', 'INT', 'REAL']);
console.log('afters...');
db.drop_table('Shaun4')
