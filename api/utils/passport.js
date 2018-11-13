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

      return valid
        ? done(null, found) // Return found user if PW is a match
        : done(null, false, { message: 'Incorrect credentials.' });
    }
    // username not found
    else return done(null, false, { message: 'Incorrect credentials.' });
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
    // Find a user using the info encoded in the JWT payload
    const found = await User.findById(payload.sub).select('-password');
    // If a user was found return it, else return false
    return found ? done(null, found) : done(null, false);
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
const FACEBOOK_APP_CALLBACK_URL =
  process.env.FACEBOOK_APP_CALLBACK_URL ||
  'http://localhost:8000/api/facebook_callback';

// define the options object using the credentials object
const FACEBOOK_OPTIONS = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACE_APP_SECRET,
  callbackURL: FACEBOOK_APP_CALLBACK_URL,
  profileFields: ['id', 'emails', 'name']
};

// feed the strategy with options and callback function
const facebook_strategy = new FacebookStrategy(FACEBOOK_OPTIONS, async function(
  accessToken,
  refreshToken,
  profile,
  done
) {
  try {
    const found = await User.findOne({ 'facebook.id': profile.id });

    if (found) {
      return done(null, found); // found user
    } else {
      const email = profile.emails[0].value;

      const facebook = {
        id: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        email: email,
        last_name: profile.name.familyName,
        first_name: profile.name.givenName
      };

      // find by email, if found update user
      const found_by_email = await User.findOne({ email });
      if (found_by_email) {
        const updated_user = await User.findOneAndUpdate(
          { email },
          { facebook },
          { new: true }
        );
        return done(null, updated_user);
      }
      // create user if it does not exist
      else {
        const new_user = new User({
          email,
          username: email,
          facebook
        });
        const created_user = await new_user.save();
        return done(null, created_user);
      }
    }
  } catch (err) {
    if (DEV) console.log(err);
    return done(null, false, { message: 'Internal Error.' });
  }
});
// use the facebook_strategy
passport.use(facebook_strategy);

module.exports = passport;
