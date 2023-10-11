const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model
const { generateToken, generateRefreshToken } = require('../utils/jwt');

// Define the login route
router.post('/login', async (req, res) => {
  try {
    const { useremail, password } = req.body; // Change "email" to "useremail"

    // Find the user by useremail
    const user = await User.findOne({ useremail }); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored password (without hashing)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const id=user._id;
    
    // Password is correct, generate a token or set a session here for authentication
    const accessToken = generateToken({ userId: user.id,useremail });
    const refreshToken=generateRefreshToken({userId:user.id})

    
    

    // Assigning refresh token in http-only cookie  

      res.cookie('jwt', refreshToken, { httpOnly: true,  
      sameSite: 'None', secure: true,  
      maxAge: 24 * 60 * 60 * 1000 }); 

    return res.status(200).json({useremail, id , accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Define the signup route
router.post('/signup', async (req, res) => {
  try {
    const {  useremail, password } = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ useremail });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create a new user
    const newUser = new User({
      useremail,
      password, // In a production app, you should hash the password before saving it to the database
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// router.post('/refresh', (req, res) => { 
//   if (req.cookies?.jwt) { 
//       // Destructuring refreshToken from cookie 
//       const refreshToken = req.cookies.jwt; 
//       // Verifying refresh token 
//       jwt.verify(refreshToken, 'your-dummy-secret-key',  
//       (err, decoded) => { 
//           if (err) {
//               // Wrong Refesh Token 
//               return res.status(406).json({ message: 'Unauthorized' }); 
//           } 
//           else {
//               // Correct token we send a new access token 
//               const accessToken = generateToken({userId: user.id,useremail}); 

//               return res.json({ accessToken }); 

//           } 

//       }) 

//   } else { 

//       return res.status(406).json({ message: 'Unauthorized' }); 

//   } 
// }) 


module.exports = router;
