// databaseConnection.js

const mongoose = require('mongoose');
require('dotenv').config()
// Create connections to different databases

// Connect to the usercollection database
const userCollectionConnection = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




// Export the database connections
module.exports = {
  userCollectionConnection,
  // productDBConnection,
};
