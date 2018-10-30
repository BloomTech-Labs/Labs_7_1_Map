const {
  create_user,
  change_password,
  change_email,
  facebook_login,
  get_user,
  login,
  update_preferences
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
  // General Route
  server.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname + '/utils/landing.html'));
  });

  // User Login Routes
  server.get('/api/entry', protected_route, (req, res) => {
    res.status(200).json({ msg: 'Entry allowed' });
  });

  server.route('/api/login').post(authenticate, login);
  server.route('/api/facebook-login').post(facebook_login);
  server.route('/api/register').post(create_user);

  // Update settings
  server.route('/api/change_password').put(protected_route, change_password);
  server.route('/api/change_email').put(protected_route, change_email);
  server.route('/api/update_preferences').put(protected_route, update_preferences)

  server.route('/api/get_user/:id').get(protected_route, get_user);

};
