
const jwt = require('jsonwebtoken');
const secret=process.env.REFRESH_TOKEN_SECRET;



const jwtMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Use 'Authorization' header
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied - Token missing' });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  };
  

module.exports=jwtMiddleware;

