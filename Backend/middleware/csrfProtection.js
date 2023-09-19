 const csrfProtection = (req, res, next) => {
    const csrfTokenFromCookies= req.cookies.csrfToken;
    const cookies = req.headers.cookie.split('; ');
    const csrfTokenFromClient = cookies.find(cookie => cookie.startsWith('csrfToken=')).split('=');
    if (csrfTokenFromCookies !== csrfTokenFromClient[1]) {
      return res.status(403).json({ message: 'Invalid CSRF token', success: false });
    }
    next();
  }
  
  module.exports = csrfProtection;