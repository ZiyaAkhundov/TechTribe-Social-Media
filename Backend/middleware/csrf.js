const generateCSRFToken = require('../csrf/csrf'); // Replace with the actual path to your generateCSRFToken module

const csrfTokenMiddleware = (req, res, next) => {
  const csrfToken = generateCSRFToken();
  res.cookie('csrf-token', csrfToken, {
    httpOnly: false,
    secure: false,
    sameSite: 'none',
    maxAge: 3600000,
    domain: 'techtribe-social-media.vercel.app',
    path: '/',
   });
  next();
}

module.exports = csrfTokenMiddleware;