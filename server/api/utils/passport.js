const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

require('dotenv').config();

const User = require('../models/user');

const secret = process.env.SECRET || 'No secret set';

// local strategy
const local_strategy = new LocalStrategy(async function(username, password, done) {
	try {
		// get a user using the username
		const found = await User.findOne({ username });
		if (found) {
			// if a user is found, verify password
			const valid = await found.check_password(password);
			if (valid) {
				// authenticated, so pass on some of the user fields
				return done(null, { _id: found._id, username: found.username, email: found.email, social: found.social });
			} else {
				// wrong password
				return done(null, false, { message: 'Incorrect credentials.' });
			}
		} else {
			// username not found
			return done(null, false, { message: 'Incorrect credentials.' });
		}
	} catch (err) {
		console.log(err);
	}
});

// Jwt strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

const jwt_strategy = new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload.sub)
		.select('-password')
		.then((user) => {
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		})
		.catch((err) => {
			return done(err, false);
		});
});

passport.use(local_strategy);
passport.use(jwt_strategy);

module.exports = passport;
