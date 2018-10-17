const { create_user } = require('./controllers/user_controller');

// export the routes
module.exports = (server) => {
	// general route
	server.get('/', (req, res) => {
		res.status(200).json({ msg: 'API is running, go to a specific api route for more information...' });
	});

	server.get('/api', (req, res) => {
		res.status(200).json({
			msg: 'API is running....',
		});
	});

	server.route('/api/register').post(create_user);
};