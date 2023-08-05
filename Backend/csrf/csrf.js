const crypto = require('crypto');

const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = generateCSRFToken;