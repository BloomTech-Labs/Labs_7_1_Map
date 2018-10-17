const { create_user, login } = require('./controllers/user_controller');
const passport = require('./utils/passport');
const path = require('path');

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

	server.route('/api/login').post(passport.authenticate('local', { session: false }), login);
	server.route('/api/register').post(create_user);
};
