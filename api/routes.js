const {
  change_email,
  change_password,
  create_user,
  facebook_loggedIn,
  get_user,
  get_users,
  login
} = require('./controllers/user_controller');
const {
  getNotes,
  getNoteById,
  postNote,
  updateNote
  // deleteNote
} = require('./controllers/notesController');
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
  server.route('/api/change_password').post(protected_route, change_password);
  server.route('/api/change_email').post(protected_route, change_email);

  // Notes Routes
  server.get('/api/note', (req, res) => {
    res.status(200).json('Note API');
  });

  server
    .route('/api/notes')
    .get(getNotes)
    .post(postNote);
  server
    .route('/api/notes/:id')
    .get(getNoteById)
    .put(updateNote);

  server.route('/api/get_user/:id').get(protected_route, get_user);
  server.route('/api/get_users/').get(get_users); // TODO: protect this route one
};
