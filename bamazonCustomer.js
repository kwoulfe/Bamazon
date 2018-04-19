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

var buy = function() {
  inquirer
    .prompt([
      {
        name: 'ProductID',
        type: 'input',
        message: 'Which item ID would you like to buy?',
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: 'Quantity',
        type: 'input',
        message: 'How many would you like to purchase?',
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(answer) {
      var query = 'SELECT * FROM products WHERE item_id=' + answer.Quantity;
      connection.query(query, function(err, res) {
        if (answer.Quantity <= res) {
          for (i = 0; i < res.length; i++) {
            console.log(
              'We have ' +
                res[i].stock_quantity +
                ' ' +
                res[i].product_name +
                ' in stock.'
            );
            console.log(
              'Thanks! ' +
                res[i].stock_quantity +
                ' ' +
                res[i].product_name +
                ' coming your way!'
            );
          }
        } else {
          console.log('Sorry, not enough of those in stock.');
        }
        start();
      });
    });
};
