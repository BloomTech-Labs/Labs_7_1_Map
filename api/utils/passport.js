const passport = require('passport');
require('dotenv').config();

// local
const LocalStrategy = require('passport-local').Strategy;

// jwt
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

// facebook
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');

const secret = process.env.SECRET || 'No secret set';
const DEV = process.env.DEV || null;

// local strategy
const local_strategy = new LocalStrategy(async (username, password, done) => {
  try {
    // get a user using the username
    const found = await User.findOne({ username });
    if (found) {
      // if a user is found, verify password
      const valid = await found.check_password(password);
      if (valid) {
        // authenticated, so pass on some of the user fields

        return done(null, found);
      } else {
        // wrong password
        return done(null, false, { message: 'Incorrect credentials.' });
      }
    } else {
      // username not found
      return done(null, false, { message: 'Incorrect credentials.' });
    }
  } catch (err) {
    if (DEV) console.log(err);
    return done(null, false, { message: 'Internal Error.' });
  }
}); // end of local stragey
passport.use(local_strategy); // using local strategy

// Jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const jwt_strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // get a user using the id
    const found = await User.findById(payload.sub).select('-password');
    if (found) {
      done(null, found); // found user
    } else {
      done(null, false); // not found
    }
  } catch (err) {
    if (DEV) console.log(err);
    return done(null, false, { message: 'Internal Error.' });
  }
}); // end of jwt strategy
passport.use(jwt_strategy); // using the jwt strategy

// facebook strategy
// load the credentials
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACE_APP_SECRET = process.env.FACE_APP_SECRET;
const FACEBOOK_APP_CALLBACK_URL_URL =
  process.env.FACEBOOK_APP_CALLBACK_URL ||
  'http://localhost:8000/api/facebook_login_success';

// define the options object using the credentials object
const FACEBOOK_OPTIONS = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACE_APP_SECRET,
  callbackURL: FACEBOOK_APP_CALLBACK_URL_URL,
  profileFields: ['emails', 'name', 'user_friends']
};

// define a call function
const FACEBOOK_CALLBACK = function(accessToken, refreshToken, profile, done) {
  /*
  User.findOrCreate(..., function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
  */
  /*
  console.log('HERERE');
  console.log('one');
  console.log(accessToken);
  console.log('two');
  console.log(refreshToken);
  console.log('trhee');
  console.log(profile);
  */
  console.log('HELLLLLLLO');
};

// feed the strategy with options and callback function
const facebook_strategy = new FacebookStrategy(
  FACEBOOK_OPTIONS,
  FACEBOOK_CALLBACK
);
// use the facebook_strategy
passport.use(facebook_strategy);

module.exports = passport;
