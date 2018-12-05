const {
  change_email,
  change_password,
  create_user,
  facebook_loggedIn,
  get_country_friends,
  get_friends_countries,
  get_user,
  get_users,
  login,
  reset_user_map,
  update_preferences
} = require('./controllers/userController');

//below handles the status change of country
const {
  handle_notes,
  handle_scratched,
  handle_status
} = require('./controllers/statusController');

const passport = require('./utils/passport');
const path = require('path');

// session is false so we can use jwt
const authenticate = passport.authenticate('local', { session: false });
const protected_route = passport.authenticate('jwt', { session: false });

// facebook strategy
const facebook_authentication = passport.authenticate('facebook', {
  scope: ['email'],
  session: false
});

const facebook_authentication_callback = passport.authenticate('facebook', {
  session: false,
  failureRedirect: '/api/login_failure'
});

// export the routes
module.exports = server => {
  // General Route
  server.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname + '/utils/landing.html'));
  });

  // Send the site's privacy policy
  // Needed for facebook integration (set in the FB developer dashboard)
  server.get('/api/privacy_policy', (req, res) => {
    res.sendFile(path.join(__dirname + '/utils/privacy_policy.html'));
  });

  // Authentication
  server.get('/api/login_failure', (req, res) => {
    res.status(400).json({ msg: 'Failed to login in' }); // TODO: Create login failure page
  });
  server.route('/api/login').post(authenticate, login);
  server.route('/api/register').post(create_user);
  server
    .route('/api/facebook_login')
    .get(facebook_authentication, facebook_loggedIn);
  server
    .route('/api/facebook_callback')
    .get(facebook_authentication_callback, facebook_loggedIn);

  // Update country on User routes
  server.route('/api/country_status').post(protected_route, handle_status);
  server.route('/api/country_notes').post(protected_route, handle_notes);
  server
    .route('/api/country_scratched')
    .post(protected_route, handle_scratched);

  server.route('/api/reset_user_map').put(protected_route, reset_user_map);

  // Update User settings routes
  server.route('/api/change_password').put(protected_route, change_password);
  server.route('/api/change_email').put(protected_route, change_email);
  server
    .route('/api/update_preferences')
    .put(protected_route, update_preferences);

  // Retrieve user data
  server.route('/api/get_user').get(protected_route, get_user);
  server.route('/api/get_users/').get(get_users); // TODO: protect this route one
  server.route('/api/get_friends_countries').get(get_friends_countries);
  server.route('/api/get_country_friends').post(protected_route, get_country_friends);
};
