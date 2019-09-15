
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;


USE bamazon;

CREATE TABLE products(
itemid INT AUTO_INCREMENT NOT NULL,
prodname VARCHAR(40) NOT NULL,
deptname VARCHAR(50) NOT NULL,
price DECIMAL (15,4) NOT NULL,
stockqty INTEGER (10) NOT NULL,
PRIMARY KEY (itemid) 
);




INSERT INTO products(prodname, deptname, price, stockqty)
VALUES ("ipad","smartphone", 12, 125);

INSERT INTO products(prodname, deptname, price, stockqty)
VALUES("PUBG","video game", 5, 130);

INSERT INTO products(prodname, deptname, price, stockqty)
VALUES("LAPTOP","Devices", 12, 125);

