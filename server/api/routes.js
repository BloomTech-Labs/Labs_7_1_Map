const { create_user, login } = require('./controllers/user_controller');
const passport = require('./utils/passport');
const path = require('path');

// session is false so we can use jwt
const authenticated = passport.authenticate('local', { session: false });
const protect_middleware = passport.authenticate('jwt', { session: false });

// export the routes
module.exports = (server) => {
	// general route
	server.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/utils/landing.html'));
	});

	server.get('/api', (req, res) => {
		res.status(200).json({
			msg: 'API is running....',
		});
	});

	server.get('/api/entry', protect_middleware, (req, res) => {
		res.status(200).json({ msg: 'Entry allowed' });
	});
	server.route('/api/login').post(authenticated, login);
	server.route('/api/register').post(create_user);
};
