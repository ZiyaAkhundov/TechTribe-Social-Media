const csrfProtection = (req, res, next) => {
    const csrfTokenFromCookie = req.cookies['csrf-token'];
    const csrfTokenFromClient = req.headers['x-csrf-token'];
    console.log(csrfTokenFromCookie)
    console.log(csrfTokenFromClient)
    if (!csrfTokenFromCookie || csrfTokenFromCookie !== csrfTokenFromClient) {
      return res.status(403).json({ message: 'Invalid CSRF token', success: false });
    }
  
    next();
  }
  
  module.exports = csrfProtection;