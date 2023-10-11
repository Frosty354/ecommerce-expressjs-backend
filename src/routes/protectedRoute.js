// routes/protectedRoute.js

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/jwt'); // Import the JWT utility function

// Protected route
router.get('/products', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Token is valid, you can proceed with protected actions here
  res.status(200).json({ message: 'Protected route accessed successfully' });
});

module.exports = router;
