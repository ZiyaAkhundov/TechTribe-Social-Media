const generateCSRFToken = require('../csrf/csrf'); // Replace with the actual path to your generateCSRFToken module

const csrfTokenMiddleware = (req, res, next) => {
  const csrfToken = generateCSRFToken();
  res.cookie('csrfToken', csrfToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: 'techtribe-api.onrender.com',
    path: '/',
   });
  next();
}

module.exports = csrfTokenMiddleware;