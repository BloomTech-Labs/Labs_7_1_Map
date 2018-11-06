const {
  change_email,
  change_password,
  create_user,
  facebook_loggedIn,
  get_user,
  get_users,
  login,
  update_preferences
} = require('./controllers/user_controller');

//below handles the status change of country
const {
// <<<<<<< HEAD
//   handle_scratched,
//   handle_status,
//   update_notes
// =======
  handle_status,
  handle_notes,
  handle_scratched
// >>>>>>> master
} = require('./controllers/statusController');

const passport = require('./utils/passport');
const path = require('path');

// session is false so we can use jwt
const authenticate = passport.authenticate('local', { session: false });
const protected_route = passport.authenticate('jwt', { session: false });

// facebook strategy
const facebook_authentication = passport.authenticate('facebook', {
  scope: ['email', 'user_friends'],
  session: false
});

const facebook_authentication_callback = passport.authenticate('facebook', {
  session: false,
  failureRedirect: '/api'
});

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

  // test route
  server.get('/api/login_failure', (req, res) => {
    res.status(400).json({ msg: 'Failed to login in' });
  });

  server.route('/api/login').post(authenticate, login);
  server.route('/api/register').post(create_user);
  server.route('/api/facebook_login').get(facebook_authentication);
  server
    .route('/api/facebook_callback')
    .get(facebook_authentication_callback, facebook_loggedIn);

  // Update country on User routes
  server.route('/api/country_status').post(protected_route, handle_status);
// <<<<<<< HEAD
//   server
//     .route('/api/country_scratched')
//     .post(protected_route, handle_scratched);
//   server.route('/api/notes').post(protected_route, update_notes);
// =======
  server.route('/api/country_notes').post(protected_route, handle_notes);
  server.route('/api/country_scratched').post(protected_route, handle_scratched);
// >>>>>>> master

  // Update User settings routes
  server.route('/api/change_password').put(protected_route, change_password);
  server.route('/api/change_email').put(protected_route, change_email);
  server
    .route('/api/update_preferences')
    .put(protected_route, update_preferences);

  server.route('/api/get_user/:id').get(protected_route, get_user);
  server.route('/api/get_users/').get(get_users); // TODO: protect this route one
};
