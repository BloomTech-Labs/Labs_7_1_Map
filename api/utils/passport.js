const passport = require('passport');
require('dotenv').config();

const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
//const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

const User = require('../models/user');

const secret = process.env.SECRET || 'No secret set';
const DEV = process.env.DEV || true;

// local strategy
const local_strategy = new LocalStrategy(async function (username, password, done) {
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
		if (DEV) {
			console.log(err);
		}
		return done(null, false, { message: 'Internal Error.' });
	}
});// end of local stragey
passport.use(local_strategy); // using local strategy

// Jwt strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

const jwt_strategy = new JwtStrategy(jwtOptions, async function (payload, done) {
	try {
		// get a user using the id
		const found = await User.findById(payload.sub).select('-password');
		if (found) {
			done(null, found); // found user
		} else {
			done(null, false); // not found
		}
	} catch (err) {
		if (DEV) {
			console.log(err);
		}
		return done(null, false, { message: 'Internal Error.' });
	}
});// end of jwt strategy
passport.use(jwt_strategy); // using the jwt strategy


// facebook strategy
/*
passport.use('provider', new OAuth2Strategy({
	authorizationURL: 'https://www.provider.com/oauth2/authorize',
	tokenURL: 'https://www.provider.com/oauth2/token',
	clientID: '123-456-789',
	clientSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
},
	function (accessToken, refreshToken, profile, done) {
		User.findOrCreate(..., function (err, user) {
			done(err, user);
		});
	}
)); // using the facebook strategy
*/
module.exports = passport;
