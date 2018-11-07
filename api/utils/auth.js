const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET || 'No secret set';

module.exports = {
  make_token: user => {
    const payload = {
      sub: user._id,
      iat: new Date().getTime(),
      username: user.username
    };
    const options = { expiresIn: '1d' };
    return jwt.sign(payload, secret, options);
  },

  validate_email: email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
};
