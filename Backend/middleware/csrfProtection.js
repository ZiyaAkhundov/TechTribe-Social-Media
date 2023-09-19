 const csrfProtection = (req, res, next) => {
    const csrfTokenFromCookies= req.cookies.csrfToken;
    const cookies = req.headers.cookie.split('; ');
    const csrfTokenFromClient = cookies.find(cookie => cookie.startsWith('csrfToken=')).split('=');
    console.log('cookies: ' + req.headers.cookie)
    console.log('csrfTokenFromCookies: '+ csrfTokenFromCookies)
    console.log('csrfTokenFromClient: '+ csrfTokenFromClient[1])
    if (csrfTokenFromCookies !== csrfTokenFromClient[1]) {
      return res.status(403).json({ message: 'Invalid CSRF token', success: false });
    }
    next();
  }
  
  module.exports = csrfProtection;