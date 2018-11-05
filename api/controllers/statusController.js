const User = require('../models/user');

/*
Route for this is '/api/country_status'
Expects a json object with the following structure:

  {
    country_code: '',
    status_code: '',
    name: '' (name of country)
  }
*/

module.exports = {
  handle_status: async (req, res) => {
    const { country_code, status_code, name } = req.body;
    const username = req.user.username;

    // Conditions to find if a country exists on the User
    const findUserCountryConditions = {
      $and: [
        { username },
        {
          countries: { $elemMatch: { country_code } }
        }
      ]
    };

    // operators
    const editCountryQuery = {
      $set: {
        'countries.$.status_code': status_code
      }
    };

    const createCountryQuery = {
      $push: {
        countries: {
          country_code,
          name,
          status_code
        }
      }
    };

    const options = { new: true };

    try {
      // Check if the User already has the country in it's countries array
      const findCountryOnUser = await User.findOne(findUserCountryConditions);

      // If country is found on user, update the country's code with the status_code in req.body
      if (findCountryOnUser) {
        try {
          const newDoc = await User.findOneAndUpdate(
            findUserCountryConditions,
            editCountryQuery,
            options
          );
          return res.status(200).json(newDoc);
        } catch (err) {
          if (DEV) console.log(err);
          return res
            .status(400)
            .json({ error: 'Failed to update country status!' });
        }
      }

      // If country does not exist on user, create a new object with the status_code in req.body
      else {
        try {
          const newDoc = await User.findOneAndUpdate(
            { username },
            createCountryQuery,
            options
          );
          return res.status(201).json(newDoc);
        } catch (err) {
          if (DEV) console.log(err);
          return res
            .status(409)
            .json({ error: 'Failed to create new country!' });
        }
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  },

  handle_notes: async (req, res) => {
    try {
      const { country_code, name, notes } = req.body;
      const username = req.user.username;

      // Conditions to find if a country exists on a User
      const findUserCountryConditions = {
        $and: [{ username }, { countries: { $elemMatch: { country_code } } }]
      };

      //below are operators
      const editCountryQuery = { $set: { 'countries.$.notes': notes } };

      const createCountryQuery = {
        $push: {
          countries: { country_code, name, notes }
        }
      };

      const options = { new: true };

      // Check if the User already has the country in it's countries array
      const findCountryOnUser = await User.findOne(findUserCountryConditions);

      if (findCountryOnUser) {
        try {
          // update the country in user
          const updatedUser = await User.findOneAndUpdate(
            findUserCountryConditions,
            editCountryQuery,
            options
          );

          return res.status(200).json(updatedUser);
        } catch (err) {
          if (DEV) console.log(err);
          return res
            .status(400)
            .json({ error: 'failure to update country notes' });
        }
      }
      // If country does not exist on user, create a new object with the info in req.body
      else {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { username },
            createCountryQuery,
            options
          );
          return res.status(201).json(updatedUser);
        } catch (err) {
          return res
            .status(409)
            .json({ error: 'Failed to create new country!' });
        }
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
};
