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

module.exports = {
  create_user: async (req, res) => {
    const check = validate_new_user(req.body);

    // found an error, terminate
    if (check.error !== undefined) {
      res.status(400).json(check);
      return;
    }

    try {
      // create a new user
      const new_user = new User(req.body);

      const created_user = await new_user.save();

      // user creation was successful, send a jwt_token back
      res.status(200).json({
        jwt_token: make_token(created_user),
        user: { id: created_user._id, username: created_user.username }
      });
    } catch (err) {
      if (DEV) console.log(err);
      res.status(500).json({ error: 'failed user creation' });
    }
  }, // create_user

  login: async (req, res) => {
    try {
      // we only reach here because we are authenticated
      res.status(200).json({ jwt_token: make_token(req.user) });
    } catch (err) {
      if (DEV) console.log(err);
      res.status(500).json({ error: 'Internal server error!' });
    }
  }, // login

  facebook_login: async (req, res) => {
    /*
    res.json({ facebook: 'We in facebook now' });
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
  }, // facebook_login

  change_password: async (req, res) => {
    try {
      const { username, new_password } = req.body;

      const user = await User.findOne({ username });

      // Check if password is the same as the old before updating
      if (await user.check_password(new_password)) {
        res.status(400).json({ error: 'New password is the same as the old!' });
      } else {
        // hash new password (mongoose doesn't support pre update hooks)
        const password_hash = await argon2.hash(new_password);

        // update password
        await User.findOneAndUpdate(
          { username },
          { password: password_hash },
          { new: true }
        );

        res.status(200).json({ message: 'Password was updated successfully!' });
      }
    } catch (err) {
      if (DEV) console.log(err);
      res.status(500).json({ error: 'Failed to change password!' });
    }
  }, // change_password

  change_email: async (req, res) => {
    try {
      const { username, new_email } = req.body;

      // update email
      await User.findOneAndUpdate(
        { username },
        { email: new_email },
        { new: true }
      );

      res.status(200).json({ message: 'Email was updated successfully!' });
    } catch (err) {
      if (DEV) console.log(err);
      res.status(500).json({ error: 'Failed to change email!' });
    }
  } // change_email

}; // module.eports
