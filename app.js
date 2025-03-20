//import Express and other dependencies 
//import express allows access to all packages imported into the project
import express from 'express';

import mariadb from 'mariadb';
import { validateForm } from './services/validation.js';
import dotenv from 'dotenv';

dotenv.config();


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})


async function connect() {  //variable created named pool look at mariadb connect mariadb connection  with async function
    try {
        let conn = await pool.getConnection();
        console.log("connected to database");
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`);
    }
}

//Instantiate an Express application // by creating variable named app making life easier
const app = express(); 

//Serve static files from the 'public' directory //tells express everything is in public folder
app.use(express.static('public')); 

//tells to send information in encoded rather url 
app.use(express.urlencoded({ extended: true }));

//setting view engine //all pages work as .ejs instead of html. 
app.set('view engine', 'ejs');

//Define a port number for our server to listen on 
const PORT = process.env.APP_PORT || 3000;

//Define a "default" route for our home page 
app.get('/', (req, res) => {
    //Send our home page as a response to the client
    res.render(`home`); //render works with ejs files res.send is for html
});

//Define a "default" route for our order page 
app.get('/order', (req, res) => {
    //Send our home page as a response to the client
    res.render(`order`); //render works with ejs files res.send is for html
});

//Define a "default" route for our order-summary page 
app.get('/order-summary', async (req, res) => {
    //connect to the database
    //reached to database
    const conn = await connect();

    //query the database and get the object that represents the database
    //orders contains everything from the orders table. Took data from database 
    const orders = await conn.query(`Select * FROM orders`)

    //Send our home page as a response to the client
    //sent the data 
    res.render(`order-summary`, {orders}); //render works with ejs files res.send is for html
});




//create post //request then look for the body in the .ejs
app.post('/confirmation', async (req, res) =>  
{

//creating the newOrder object
const newOrder = {
    ClassicBurgerQuantity: req.body.ClassicBurgerQuantity,
    CheeseBurgerQuantity: req.body.CheeseBurgerQuantity,
    ChickenBurgerQuantity: req.body.ChickenBurgerQuantity,
    fname: req.body.fname,
    lname: req.body.lname,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    streetAddress: req.body.streetAddress,
    streetAddressLine2: req.body.streetAddressLine2,
    city: req.body.city,
    stateProvince: req.body.stateProvince,
    postalZipCode: req.body.postalZipCode,
    payment: req.body.payment,
    };

console.log(newOrder);

const result = validateForm(newOrder);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    const conn = await connect();

    //preventing sql injection
    const insertQuery = await conn.query(`INSERT INTO
orders(
	ClassicBurgerQuantity,
    CheeseBurgerQuantity, 
    ChickenBurgerQuantity,
    fname,
    lname,
    phoneNumber,
    email,
    streetAddress,
    streetAddressLine2,
    city,
    stateProvince,
    postalZipCode,
    payment
)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?)`, 

[ newOrder.ClassicBurgerQuantity,
    newOrder.CheeseBurgerQuantity, 
    newOrder.ChickenBurgerQuantity,
    newOrder.fname,
    newOrder.lname,
    newOrder.phoneNumber,
    newOrder.email,
    newOrder.streetAddress,
    newOrder.streetAddressLine2,
    newOrder.city,
    newOrder.stateProvince,
    newOrder.postalZipCode,
    newOrder.payment]);
      


    res.render('confirmation', { newOrder });
});
    



//Send port in Console.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});