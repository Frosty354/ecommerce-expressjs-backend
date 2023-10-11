const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
 
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add any other fields you need for your User model
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
