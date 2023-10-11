// databaseConnection.js

const mongoose = require('mongoose');

// Create connections to different databases

// Connect to the usercollection database
const userCollectionConnection = mongoose.connect('mongodb+srv://ayonchakraborty75:eklENHCmUzZuI2jV@cluster0.mfdl2yp.mongodb.net/usercollection?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Connect to the productdb database
// const productDBConnection = mongoose.createConnection('mongodb+srv://ayonchakraborty75:eklENHCmUzZuI2jV@cluster0.mfdl2yp.mongodb.net/productdb?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// Export the database connections
module.exports = {
  userCollectionConnection,
  // productDBConnection,
};
