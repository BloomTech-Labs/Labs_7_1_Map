const {
  create_user,
  login,
  change_password,
  change_email,
  facebook_login,
  get_user
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
  server.route('/api/change_password').post(protected_route, change_password);
  server.route('/api/change_email').post(protected_route, change_email);


  // Notes Routes
  server.get('/api/note', (req, res) => {
    res.status(200).json('Note API IS LIT');
  });

  server
    .route('/api/notes')
    .get(getNotes)
    .post(postNote);
  server
    .route('/api/notes/:id')
    .get(getNoteById)
    .put(updateNote);
  // .destroy(deleteNote);

  server.route('/api/get_user/:id').get(protected_route, get_user);

};
