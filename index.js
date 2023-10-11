const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { userCollectionConnection, productDBConnection } = require('./src/connection/database');
const dotenv = require('dotenv'); 
const cookieparser = require('cookie-parser'); 
const port = 3052; // Use the port of your choice
  
// Configuring dotenv 
dotenv.config(); 


userCollectionConnection.then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.error("Error connecting to database:", err);
});

// productDBConnection.then(() => {
//   console.log("Connected to productdb database");
// }).catch((err) => {
//   console.error("Error connecting to productdb database:", err);
// });



app.use(bodyParser.json());
app.use(express.json()); 
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false })); 
app.use(cookieparser());

// Allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));



// Setting up middlewares to parse request body and cookies 


// Import the user route
const userRoute = require('./src/routes/user');
app.use('/user', userRoute);

const productRoute= require('./src/routes/products');
app.use('/products',productRoute);

const protectedRoute = require('./src/routes/protectedRoute');
app.use('/protected', protectedRoute);

// const paymentRoute = require('./routes/payment');
// app.use('/api/payment', paymentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
