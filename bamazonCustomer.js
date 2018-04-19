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

var start = function() {
  var query = 'SELECT * FROM Products';
  connection.query(query, function(err, res) {
    for (i = 0; i < res.length; i++) {
      console.log(
        'Item ID: ' +
          res[i].item_id +
          ' || Product: ' +
          res[i].product_name +
          ' || Department: ' +
          res[i].department_name +
          ' || Price: ' +
          res[i].price +
          ' || Stock: ' +
          res[i].stock_quantity
      );
    }
    buy();
  });
};
