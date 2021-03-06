var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 8809,
  user: 'root',
  password: 'root',
  database: 'bamazon_db'
});

var start = function() {
  connection.query('SELECT * FROM Products', function(err, res) {
    var table = new Table({
      head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
    });
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log('  ');

    console.log(table.toString());
    //   });
    // };

    inquirer
      .prompt([
        {
          name: 'item_ID',
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
          name: 'stock_quantity',
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
        var chosenID = answer.item_ID;
        var chosenProduct = res[chosenID];
        var chosenQuantity = answer.stock_quantity;

        if (chosenQuantity < res[chosenID].stock_quantity) {
          console.log(
            'Total cost for ' +
              answer.stock_quantity +
              ' ' +
              res[chosenID].product_name +
              ' is: ' +
              res[chosenID].price * chosenQuantity
          );
          connection.query(
            'UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity: res[chosenID].stock_quantity - chosenQuantity
              },
              {
                item_id: res[chosenID].item_id
              }
            ],
            function(err, res) {
              start();
            }
          );
        } else {
          console.log('Sorry, not enough of those in stock.');
          start();
        }
      });
  });
};

start();
