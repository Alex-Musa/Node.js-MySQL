
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection is successful!");


    createTable();
})

var createTable = function () {

    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].itemid + " -- " + res[i].prodname + " -- " + res[i].deptname + " -- " + res[i].price + " -- " + res[i].stockqty + "\n")
        }

        promptUser(res);
    })
}


var promptUser = function (res) {


    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase? [Quit with Q]"


    }]).then(function (answer) {


        var correct = false;


        if (answer.choice.toUpperCase() == "Q") {
            process.exit();
        }

        for (var i = 0; i < res.length; i++) {

           
            if (res[i].prodname == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;

         
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                 
                }).then(function (answer) {
                    if ((res[id].stockqty - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stockqty=' " + (res[id].stockqty - answer.quantity) + " ' WHERE prodname='" + product + "'", function (err, res2) {
                            console.log("Prouduct Purchased!");
                            createTable();
                        })

                    } else {
                        console.log("Insufficient quantity!");
                        promptUser(res);
                    }
                })
            }
        }

        if (i == res.length && correct == false) {
            console.log("Not a valid selection!");
            promptUser(res);
        }
    })
}

