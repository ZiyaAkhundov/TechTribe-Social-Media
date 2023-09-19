 const csrfProtection = (req, res, next) => {
    const csrfTokenFromSession= req.session.csrfToken;
    const csrfTokenFromClient = req.headers['x-csrf-token'];
    console.log('csrfTokenFromSession: '+ csrfTokenFromSession)
    console.log('csrfTokenFromClient: '+ csrfTokenFromClient)
    if (csrfTokenFromSession !== csrfTokenFromClient) {
      return res.status(403).json({ message: 'Invalid CSRF token', success: false });
    }
    next();
  }
  
  module.exports = csrfProtection;