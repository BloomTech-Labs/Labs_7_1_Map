const User = require('../models/user');

//note from nalee
//current route for this is localhost:8000/api/country_status
//it currently is accepting a json object with the following structure
/*
{
  country_code: '',
  status_code: '',
  name: '' (name of country)
  username: '',
}
*/
module.exports = {
  handle_status: async (req, res) => {
    const { country_code, status_code, username, name } = req.body;

    //below are queries
    const queryUserCountry = {
      $and: [
        { username: username },
        {
          countries: { $elemMatch: { country_code: country_code } }
        }
      ]
    };
    const queryUser = {
      username: username
    };

    //below are operators
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
      // Search for document that includes user & country
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
          res.status(400).json({ error: 'failure to update country status' });
        }
      }
      // If country does not exist on user, create a new object with status_code in req.body
      else {
        try {
          const newDoc = await User.findOneAndUpdate(
            queryUser,
            createCountry,
            options
          );
          return res.status(201).json(newDoc);
        } catch (err) {
          res.status(409).json({ error: 'failure to create new country' });
        }
      }
    } catch (err) {
      res.status(500).json({ error: 'failure to initiate query' });
    }

    /*
    User.findOne(queryUserCountry)
      .then(result => {
        if (result !== null) {
          User.findOneAndUpdate(queryUserCountry, editCountry, options)
            .then(newDoc => {
              res.status(200).json(newDoc);
            })
            .catch(err => {
              res
                .status(400)
                .json({ error: 'failure to update country status' });
            });
        } else {
          User.findOneAndUpdate(queryUser, createCountry, options)
            .then(newDoc => {
              res.status(201).json(newDoc);
            })
            .catch(err => {
              res.status(409).json({ error: 'failure to create new country' });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'failure to initiate query' });
      });
    */
  }
};
