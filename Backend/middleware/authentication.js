//Middleware
const jwt = require('jsonwebtoken');
const isAuthenticated = (req, res, next) => {
    const jwtToken = req.cookies.TechtribeToken;
    if (jwtToken) {
      try {
        const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
        const userIdFromToken = decodedToken.userId;
  
        if (req.session && req.session.userId && req.session.userId.toString() === userIdFromToken) {
          next();
        } else {
          return res.status(401).json({ message: 'Unauthorized' });
        }
      } catch (error) {
        console.error('Error verifying JWT:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

  module.exports = isAuthenticated;