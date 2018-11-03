const User = require('../models/user');
const DEV = process.env.DEV || true;

module.exports = {
  update_notes: async (req, res) => {
    try {
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  },

  handle_scratched: async (req, res) => {
    try {
      console.log('here');
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  },

  handle_status: async (req, res) => {
    try {
      const {
        country_code,
        status_code,
        username,
        name,
        scratched,
        notes
      } = req.body;

      //below are queries
      const queryUserCountry = {
        $and: [
          { username: username },
          {
            countries: {
              $elemMatch: { country_code: country_code }
            }
          }
        ]
      };
      const queryUser = {
        username: username
      };

      //below are operators
      const editCountry = {
        $set: {
          'countries.$.status_code': status_code,
          'countries.$.scratched': scratched,
          'countries.$.notes': notes
        }
      };

      const createCountry = {
        $push: {
          countries: {
            country_code: country_code,
            name: name,
            status_code: status_code,
            notes: '',
            scratched: true
          }
        }
      };

      //below is the option to return the document, after it is edited, from
      //findOneAndUpdate()

      const options = {
        //cant get this to work
        new: true
        // {returnOriginal:false}
      };

      //logic for below:
      //1. searches for document that includes user & country (findOne)
      //2. If fails, that means user does not have the country
      // it will create a new country object for that use with all of the information from the req.body (updateOne)
      //3. If #1 succeeds, it will update the user countries code with the status_code from the req.body (findOneAndUpdate)
      const found_user_country = await User.findOne(queryUserCountry);

      if (found_user_country) {
        // update the country in user
        const updated_country = await User.findOneAndUpdate(
          queryUserCountry,
          editCountry,
          options
        );
        if (updated_country) {
          res.status(200).json(updated_country);
        } else {
          res.status(400).json({ error: 'failure to update country status' });
        }
      } else {
        // create new country by updating the user
        const found_user = await User.findOneAndUpdate(
          queryUser,
          createCountry,
          options
        );
        if (found_user) {
          res.status(200).json(found_user);
        } else {
          res.status(409).json({ error: 'failure to create new country' });
        }
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
};
