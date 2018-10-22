const {
  create_user,
  login,
  change_password,
  change_email,
  facebook_login
} = require('./controllers/user_controller');
const passport = require('./utils/passport');
const path = require('path');

// session is false so we can use jwt
const authenticate = passport.authenticate('local', { session: false });
const facebook_authentication = passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
});
const protected_route = passport.authenticate('jwt', { session: false });

// export the routes
module.exports = server => {
  // general route
  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/utils/landing.html'));
  });

  server.get('/api', (req, res) => {
    res.status(200).json({
      msg: 'API is running....'
    });
  });

  server.get('/api/entry', protected_route, (req, res) => {
    res.status(200).json({ msg: 'Entry allowed' });
  });

  server.route('/api/login').post(authenticate, login);
  server.route('/api/facebook-login').post(facebook_login);
  server.route('/api/register').post(create_user);
  server.route('/api/change_password').post(protected_route, change_password);
  server.route('/api/change_email').post(protected_route, change_email);
};
