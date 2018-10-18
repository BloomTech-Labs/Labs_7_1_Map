const argon2 = require('argon2');
const User = require('../models/user');
const { make_token } = require('../utils/auth');

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

      // send a successful response back
      res.status(200).json(created_user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'failed user creation' });
    }
  }, //create_user

  login: async (req, res) => {
    try {
      // we only reach here because we are authenticated
      res.status(200).json({ token: make_token(req.user) });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error!' });
    }
  }, // login

  change_password: async (req, res) => {
    try {
			const { username, new_password } = req.body;

      // hash new password here instead of schema because
      // mongoose doesn't support pre update hooks
			const password_hash = await argon2.hash(new_password);

      // change user's password
      // TODO: verify that new password isn't the same as the old?
      const updated_user = await User.findOneAndUpdate(
        { username},
        { password: password_hash },
        { new: true }
			);

			// TODO: Remove password field from returned object
      res.status(200).json({ updated_user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to change password!' });
    }
  }
}; //module.eports
