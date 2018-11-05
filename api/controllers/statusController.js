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

    // queries
    const queryUserCountry = {
      $and: [
        { username: req.user.username },
        {
          countries: { $elemMatch: { country_code: country_code } }
        }
      ]
    };
    const queryUser = {
      username: req.user.username
    };

    // operators
    const editCountry = {
      $set: {
        'countries.$.status_code': status_code
      }
    };

    const createCountry = {
      $push: {
        countries: {
          country_code: country_code,
          name: name,
          status_code: status_code,
          notes: ''
        }
      }
    };

    const options = {
      new: true
    };

    try {
      // Check if the User already has the country in it's countries array
      const findCountryOnUser = await User.findOne(queryUserCountry);

      // If country is found on user, update the country's code with the status_code in req.body
      if (findCountryOnUser) {
        try {
          const newDoc = await User.findOneAndUpdate(
            queryUserCountry,
            editCountry,
            options
          );
          return res.status(200).json(newDoc);
        } catch (err) {
          return res
            .status(400)
            .json({ error: 'Failed to update country status!' });
        }
      }

      // If country does not exist on user, create a new object with the status_code in req.body
      else {
        try {
          const newDoc = await User.findOneAndUpdate(
            queryUser,
            createCountry,
            options
          );
          return res.status(201).json(newDoc);
        } catch (err) {
          return res
            .status(409)
            .json({ error: 'Failed to create new country!' });
        }
      }
    } catch (err) {
      return res.status(500).json({ error: 'Failed to initiate query!' });
    }
  }
};
