
create database platics;
use platics;
create table `account`(
account_id bigint primary key auto_increment,
password varchar(255),
username varchar(255));

create table `role`(
role_id bigint primary key auto_increment,
role_name varchar(255)
);

create table `account_role`(
account_role_id bigint primary key auto_increment,
account_id bigint,
role_id bigint,
foreign key(account_id) references `account`(account_id),
foreign key(role_id) references `role`(role_id)
);

create table employee(
employee_id bigint primary key auto_increment,
employee_id_name varchar(45),
employee_phone_number varchar(45),
employee_id_card varchar(45) unique,
employee_address varchar (225),
employee_gender boolean,
employee_date_of_birth date,
employee_email varchar(45) unicode,
account_id bigint,
foreign key (account_id) references account(account_id)
);

create table customer (
customer_id bigint  primary key auto_increment,
customer_name varchar(45),
customer_date_of_birth varchar(45),
customer_phone_number varchar(45),
customer_id_card varchar(45) unicode,
customer_address varchar (225),
customer_gender boolean,
customer_email varchar(45) unique,
account_id bigint,
foreign key (account_id) references account(account_id)
);

create table product_type(
product_type_id int primary key auto_increment, 
product_type_name varchar (45)
) ;

create table brand(
brand_id int primary key auto_increment, 
brand_name varchar (45)
);


create table product (
product_id bigint  primary key auto_increment,
product_image varchar(300),
product_name varchar(45),
product_price double,
product_description varchar(400),
product_quantity int ,
product_type_id int,
brand_id int,
foreign key (brand_id) references brand(brand_id),
foreign key (product_type_id) references product_type(product_type_id)
);


create table `order` (
order_id bigint primary key auto_increment ,
date_purchase date ,
is_paid boolean,
customer_id bigint ,
foreign key (customer_id) references customer(customer_id)
);

create table `order_detail` (	
order_detail_id int primary key auto_increment ,
order_detail_quantity bigint,
product_id bigint ,
order_id bigint ,
foreign key (order_id) references `order`(order_id),
foreign key (product_id) references product(product_id)
);

create table `cart`(
cart_id bigint primary key auto_increment,
customer_id bigint,
foreign key(customer_id) references customer(customer_id)
);

create table `cart_detail`(
cart_detail_id bigint primary key auto_increment,
cart_id bigint,
product_id bigint,
foreign key(cart_id) references cart(cart_id),
foreign key(product_id) references product(product_id)
);