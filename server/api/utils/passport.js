const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const local_strategy = new LocalStrategy(async function(username, password, done) {
	try {
		// get a user using the username
		const found = await User.findOne({ username });
		if (found) {
			// if a user is found, verify password
			const valid = await found.check_password(password);
			if (valid) {
				return done(null, found);
			} else {
				return done(null, false, { message: 'Incorrect credentials.' });
			}
		} else {
			return done(null, false, { message: 'Incorrect credentials.' });
		}
	} catch (err) {
		console.log(err);
	}
});

passport.use(local_strategy);

module.exports = passport;
