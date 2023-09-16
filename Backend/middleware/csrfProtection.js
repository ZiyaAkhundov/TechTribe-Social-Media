 const csrfProtection = (req, res, next) => {
    const csrfTokenFromCookie = req.cookies.csrfToken;
    if (!csrfTokenFromCookie) {
      return res.status(403).json({ message: 'Invalid CSRF token', success: false });
    }
    next();
  }
  
  module.exports = csrfProtection;