const generateCSRFToken = require('../csrf/csrf'); // Replace with the actual path to your generateCSRFToken module

const csrfTokenMiddleware = (req, res, next) => {
  const csrfToken = generateCSRFToken();
  res.cookie('csrfToken', csrfToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 3600000,
    domain: 'techtribe-api.onrender.com',
    path: '/',
   });
  next();
}

module.exports = csrfTokenMiddleware;