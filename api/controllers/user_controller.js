const argon2 = require('argon2');
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

// put the methods in alphabetical order
module.exports = {
  change_email: async (req, res) => {
    try {
      // TODO: Implement better email validation
      // Naive validation.
      if (req.body.new_email.length < 5) {
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
      }
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
          .json({ error: 'Password needs to be at least characters!' });

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
    const check = validate_new_user(req.body);

    // found an error, terminate
    if (check.error !== undefined) {
      return res.status(400).json(check);
      return;
    }

    try {
      // create a new user
      const new_user = new User(req.body);

      const created_user = await new_user.save();

      if (created_user) {
        // user creation was successful, send a jwt_token back
        return res.status(200).json({
          jwt_token: make_token(created_user),
          user: {
            id: created_user._id,
            username: created_user.username,
            countries: created_user.countries
          }
        });
      } else {
        if (DEV) console.log(err);
        return res.status(400).json({ error: 'failed user creation' });
      }
    } catch (err) {
      // if (DEV) console.log(err);
      return res.status(500).json({ error: err });
    }
  }, // create_user

  facebook_loggedIn: async (req, res) => {
    try {
      // we only reach here because we are authenticated
      const user = {
        id: req.user.id,
        username: req.user.username,
        preferences: req.user.preferences,
        countries: req.user.countries
      }; // add the things you need to send
      return res.status(200).json({ jwt_token: make_token(req.user), user });
    } catch (err) {
      if (DEV) {
        console.log(err);
      }
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }, // facebook_login

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
      // req.body.preferences should be an object with properties for each setting
      //  e.g. { theme: 'light', autoscratch: true }
      const { preferences } = req.body;
      if (!preferences) {
        return res
          .status(400)
          .send({ error: 'You did not provide updated preferences!' });
      }

      const updatedUser = await User.findOneAndUpdate(
        { username: req.user.username },
        { preferences },
        { new: true }
      );

      const response = {
        username: updatedUser.username,
        preferences: updatedUser.preferences,
        countries: updatedUser.countries
      };

      return res.status(200).json(response);
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).send({ error: 'Failed to update preferences' });
    }
  } // update_preferences
}; // module.exports
