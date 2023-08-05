const generateCSRFToken = require('../csrf/csrf'); // Replace with the actual path to your generateCSRFToken module

const csrfTokenMiddleware = (req, res, next) => {
  const csrfToken = generateCSRFToken();
  res.cookie('csrf-token', csrfToken, {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    maxAge: 3600000,
    domain: 'localhost',
    path: '/',
   });
  next();
}

module.exports = csrfTokenMiddleware;