var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'bamazon_db'
});

connection.connect(function(err) {
  console.log('connected as id: ' + connection.threadId + '\n');
  start();
});
