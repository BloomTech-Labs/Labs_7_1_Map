const User = require('../models/user');
const { make_token } = require('../utils/auth');

const DEV = process.env.DEV || true;

// validate the information entered by a new user
const validate_new_user = ({ username, password, email }) => {
	if (username === undefined || password === undefined || email === undefined) {
		return { error: 'username, password, and email required for registration' };
	}
	if (password.length < 6) {
		return { error: 'password must be of length greater than 6!' };
	}
	return {}; // no error, so return an empty object
}; // end of error checks

module.exports = {
	create_user: async (req, res) => {
		const check = validate_new_user(req.body);

		// found an error, terminate
		if (check.error !== undefined) {
			res.status(400).json(check);
			return;
		}

		try {
			//create a new user
			const new_user = new User(req.body);

			const created_user = await new_user.save();

			// user creation was successful, send a jwt_token back
			res
				.status(200)
				.json({ jwt_token: make_token(created_user), user: { id: created_user._id, username: created_user.username } }); //TODO: what user information to send
		} catch (err) {
			if (DEV) {
				console.log(err);
			}
			res.status(500).json({ error: 'failed user creation' });
		}
	}, //create_user

	login: async (req, res) => {
		try {
			// we only reach here because we are authenticated
			res.status(200).json({ jwt_token: make_token(req.user) });
		} catch (err) {
			if (DEV) {
				console.log(err);
			}
			res.status(500).json({ error: 'Internal server error!' });
		}
	}, // login

	facebook_login: async (req, res) => {
		res.json({ facebook: "We in facebook now" })
		/*
		try {
			// we only reach here because we are authenticated
			res.status(200).json({ jwt_token: make_token(req.user) });
		} catch (err) {
			if (DEV) {
				console.log(err);
			}
			res.status(500).json({ error: 'Internal server error!' });
		}
		*/
	}, // facebook-login
}; //module.eports
