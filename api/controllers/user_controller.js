const argon2 = require('argon2');
const User = require('../models/user');
const { make_token } = require('../utils/auth');

const DEV = process.env.DEV || true;

// Validate the information entered by a new user
function validate_new_user({ username, password, email }) {
  if (username === undefined || password === undefined || email === undefined) {
    return { error: 'Username, Password, and Email required for registration' };
  }
  if (password.length < 6) {
    return { error: 'Password must be of length greater than 6!' };
  }

  if (!validate_email(email)) return { error: 'Email is not valid!' };
  return null;
}

// Check if a provided email address is valid
function validate_email(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// put the methods in alphabetical order
module.exports = {
  change_email: async (req, res) => {
    try {
      if (!validate_email(req.body.new_email))
        return res.status(400).json({ error: 'Not a valid email address!' });

      // Update email address stored on DB
      // Passport passes on req.user based on the JWT supplied
      const response = await User.findOneAndUpdate(
        { username: req.user.username },
        { email: req.body.new_email },
        { new: true }
      );

      return response.email === req.body.new_email.toLowerCase()
        ? res.status(200).json({ message: 'Email was updated successfully!' })
        : res.status(400).json({ message: 'Failed to update email!' });
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }, // change_email

  change_password: async (req, res) => {
    try {
      const { new_password } = req.body;

      // Check if password is long enough
      if (new_password.length < 6)
        return res
          .status(400)
          .json({ error: 'Password needs to be at least 6 characters!' });

      const user = await User.findOne({ username: req.user.username });

      // Check if password is the same as the old before updating
      if (await user.check_password(new_password)) {
        return res
          .status(400)
          .json({ error: 'New password is the same as the old!' });
      }
      // Hash new password here (mongoose doesn't support pre update hooks)
      else {
        const password_hash = await argon2.hash(new_password);

        // Update password
        await User.findOneAndUpdate(
          { username: req.user.username },
          { password: password_hash },
          { new: true }
        );

        return res
          .status(200)
          .json({ message: 'Password was updated successfully!' });
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Failed to change password!' });
    }
  }, // change_password

  create_user: async (req, res) => {
    // Check if the provided user info is valid
    const errorCheck = validate_new_user(req.body);
    if (errorCheck) return res.status(400).json({ error: errorCheck.error });

    try {
      // create a new user
      const created_user = await new User(req.body).save();

      if (created_user) {
        // user creation was successful, send a jwt_token back
        return res.status(200).json({
          jwt_token: make_token(created_user),
          user: {
            id: created_user._id,
            username: created_user.username,
            countries: created_user.countries,
            preferences: created_user.preferences
          }
        });
      } else {
        if (DEV) console.log(err);
        return res.status(400).json({ error: 'failed user creation' });
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }, // create_user

  // Successful FB login is eventually redirected here
  facebook_loggedIn: async (req, res) => {
    console.log('facebook_loggedIn');
    try {
      // we only reach here because we are authenticated
      const user = {
        id: req.user.id,
        username: req.user.username,
        preferences: req.user.preferences,
        countries: req.user.countries,
        facebook: req.user.facebook
      }; // add the things you need to send

      // Create a JWT and redirect with token in query string
      // Client will extract and save token to localStorage
      const jwt_token = make_token(req.user);
      const redirectURL = DEV
        ? `http://localhost:3000?token=${jwt_token}`
        : `/?token=${jwt_token}`;
      return res.redirect(redirectURL);
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }, // facebook_login

  get_friends_countries: async (req, res) => {
    try {
      console.log(req.query.id);
      const user = await User.findOne({ 'facebook.id': req.query.id });

      return user.facebook.id === req.query.id
        ? res.status(200).json(user.countries)
        : res
            .status(400)
            .json({ error: 'No user was found with that facebook ID!' });
    } catch (err) {
      if (DEV) console.log(err);
      res.status(500).json({ error: 'Internal server error!' });
    }
  },

  get_user: async (req, res) => {
    try {
      // If a valid token was provided, Passport will find the user and added
      // it to the request as req.user without the password field
      return req.user
        ? res.status(200).json(req.user)
        : res.status(400).json({ error: 'Invalid token!' });
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }, // get_user

  get_users: async (req, res) => {
    try {
      const foundUsers = await User.find({});
      if (foundUsers) {
        return res.status(200).json(foundUsers);
      } else {
        return res.status(400).json({ msg: 'No users found!' });
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Failed to get user!' });
    }
  },

  login: async (req, res) => {
    try {
      // we only reach here because we are authenticated
      const { _id, username, email, countries, preferences } = req.user;
      const user = {
        _id,
        username,
        email,
        countries,
        preferences
      }; // add the things you need to send
      return res.status(200).json({ jwt_token: make_token(req.user), user });
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }, // login

  update_preferences: async (req, res) => {
    try {
      // Error handling
      // req.body.preferences should be an object with properties for each setting
      //  e.g. { theme: 'light', autoscratch: true }
      const { preferences } = req.body;
      if (!preferences)
        return res
          .status(400)
          .json({ error: 'You did not provide updated preferences!' });

      if (
        preferences.theme === undefined ||
        preferences.autoscratch === undefined
      )
        return res
          .status(400)
          .json({ error: 'The updated preferences are not valid!' });

      // Update user's preferences
      const updatedUser = await User.findOneAndUpdate(
        { username: req.user.username },
        { preferences },
        { new: true }
      );

      return res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        preferences: updatedUser.preferences,
        countries: updatedUser.countries
      });
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).send({ error: 'Internal server error!' });
    }
  } // update_preferences
}; // module.exports
