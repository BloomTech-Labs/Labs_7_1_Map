const User = require('../models/user');
const DEV = process.env.DEV || true;

/*
Route for this is '/api/country_status'
Expects a json object with the following structure:

  {
    country_code: '',
    status_code: '',
    name: '' (name of country)
  }
*/

// TODO: A lot of duplicate code written in these functions. Refactor to eliminate some repition.

module.exports = {
//<<<<<<< HEAD
//  handle_scratched: async (req, res) => {
//    try {
//      const { country_code, username, name, scratched, notes } = req.body;
//      const have_notes = notes ? notes : '';
//      //below are queries
//      const queryUserCountry = {
//        $and: [
//          { username: username },
//          { countries: { $elemMatch: { country_code: country_code } } }
//        ]
//      };
//      const queryUser = { username: username };

//      //below are operators
//      const editCountry = {
//        $set: {
//          'countries.$.notes': have_notes,
//          'countries.$.scratched': scratched
//        }
//      };

//      const createCountry = {
//        $push: {
//          countries: {
//            country_code: country_code,
//            name: name,
//            scratched: scratched,
//            notes: have_notes
//          }
//        }
//      };

//      const options = { new: true };

//      //logic for below:
//      //1. searches for document that includes user & country (findOne)
//      //2. If fails, that means user does not have the country
//      // it will create a new country object for that use with all of the information from the req.body (updateOne)
//      //3. If #1 succeeds, it will update the user countries code with the status_code from the req.body (findOneAndUpdate)
//      const found_user_country = await User.findOne(queryUserCountry);

//      if (found_user_country) {
//        // update the country in user
//        const updated_country = await User.findOneAndUpdate(
//          queryUserCountry,
//          editCountry,
//          options
//        );
//        if (updated_country) {
//          res.status(200).json(updated_country);
//        } else {
//          res.status(400).json({ error: 'failure to update country scratch' });
//        }
//      } else {
//        // create new country by updating the user
//        const found_user = await User.findOneAndUpdate(
//          queryUser,
//          createCountry,
//          options
//        );
//        if (found_user) {
//          res.status(200).json(found_user);
//        } else {
//          res.status(409).json({ error: 'failure to create new country' });
//        }
//      }
//    } catch (err) {
//      if (DEV) console.log(err);
//      return res.status(500).json({ error: 'Internal server error!' });
//    }
//  },

//  handle_status: async (req, res) => {
//    try {
//      const {
//        country_code,
//        status_code,
//        username,
//        name,
//        scratched,
//        notes
//      } = req.body;

//      //below are queries
//      const queryUserCountry = {
//        $and: [
//          { username: username },
//          {
//            countries: {
//              $elemMatch: { country_code: country_code }
//            }
//          }
//        ]
//      };
//      const queryUser = {
//        username: username
//      };

//      //below are operators
//      const editCountry = {
//        $set: {
//          'countries.$.status_code': status_code,
//          'countries.$.scratched': scratched,
//          'countries.$.notes': notes
//        }
//      };

//      const createCountry = {
//        $push: {
//          countries: {
//            country_code: country_code,
//            name: name,
//            status_code: status_code,
//            notes: '',
//            scratched: true
//          }
//        }
//      };

//      //below is the option to return the document, after it is edited, from
//      //findOneAndUpdate()

//      const options = {
//        //cant get this to work
//        new: true
//        // {returnOriginal:false}
//      };

//      //logic for below:
//      //1. searches for document that includes user & country (findOne)
//      //2. If fails, that means user does not have the country
//      // it will create a new country object for that use with all of the information from the req.body (updateOne)
//      //3. If #1 succeeds, it will update the user countries code with the status_code from the req.body (findOneAndUpdate)
//      const found_user_country = await User.findOne(queryUserCountry);

//      if (found_user_country) {
//        // update the country in user
//        const updated_country = await User.findOneAndUpdate(
//          queryUserCountry,
//          editCountry,
//          options
//        );
//        if (updated_country) {
//          res.status(200).json(updated_country);
//        } else {
//          res.status(400).json({ error: 'failure to update country status' });
//        }
//      } else {
//        // create new country by updating the user
//        const found_user = await User.findOneAndUpdate(
//          queryUser,
//          createCountry,
//          options
//        );
//        if (found_user) {
//          res.status(200).json(found_user);
//        } else {
//          res.status(409).json({ error: 'failure to create new country' });
//        }
//      }
//=======
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
          const updatedUser = await User.findOneAndUpdate(
            findUserCountryConditions,
            editCountryQuery,
            options
          );

          const response = {
            username: updatedUser.username,
            countries: updatedUser.countries,
          }

          return res.status(200).json(response);
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
          const updatedUser = await User.findOneAndUpdate(
            { username },
            createCountryQuery,
            options
          );

          const response = {
            username: updatedUser.username,
            countries: updatedUser.countries,
          }

          return res.status(201).json(response);
        } catch (err) {
          if (DEV) console.log(err);
          return res
            .status(409)
            .json({ error: 'Failed to create a new country and update status!' });
        }
      }
// >>>>>>> master
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  },

//<<<<<<< HEAD
//  update_notes: async (req, res) => {
//    try {
//      const { country_code, username, name, notes } = req.body;
//      //below are queries
//      const queryUserCountry = {
//        $and: [
//          { username: username },
//          { countries: { $elemMatch: { country_code: country_code } } }
//        ]
//      };
//      const queryUser = { username: username };

//      //below are operators
//      const editCountry = { $set: { 'countries.$.notes': notes } };

//      const createCountry = {
//        $push: {
//          countries: { country_code: country_code, name: name, notes: notes }
//=======
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
// >>>>>>> master
        }
      };

      const options = { new: true };

//<<<<<<< HEAD
//      //logic for below:
//      //1. searches for document that includes user & country (findOne)
//      //2. If fails, that means user does not have the country
//      // it will create a new country object for that use with all of the information from the req.body (updateOne)
//      //3. If #1 succeeds, it will update the user countries code with the status_code from the req.body (findOneAndUpdate)
//      const found_user_country = await User.findOne(queryUserCountry);

//      if (found_user_country) {
//        // update the country in user
//        const updated_country = await User.findOneAndUpdate(
//          queryUserCountry,
//          editCountry,
//          options
//        );
//        if (updated_country) {
//          res.status(200).json(updated_country);
//        } else {
//          res.status(400).json({ error: 'failure to update country notes' });
//        }
//      } else {
//        // create new country by updating the user
//        const found_user = await User.findOneAndUpdate(
//          queryUser,
//          createCountry,
//          options
//        );
//        if (found_user) {
//          res.status(200).json(found_user);
//        } else {
//          res.status(409).json({ error: 'failure to create new country' });
//        }
//=======
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

          const response = {
            username: updatedUser.username,
            countries: updatedUser.countries,
          }

          return res.status(200).json(response);
        } catch (err) {
          if (DEV) console.log(err);
          return res
            .status(400)
            .json({ error: 'Failed to updates notes!' });
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

          const response = {
            username: updatedUser.username,
            countries: updatedUser.countries,
          }

          return res.status(201).json(response);
        } catch (err) {
          return res
            .status(409)
            .json({ error: 'Failed to create a new country and update notes!' });
        }
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  },

  handle_scratched: async (req, res) => {
    try {
      const { country_code, name, scratched } = req.body;
      const username = req.user.username;

      // Conditions to find if a country exists on a User
      const findUserCountryConditions = {
        $and: [{ username }, { countries: { $elemMatch: { country_code } } }]
      };

      //below are operators
      const editCountryQuery = { $set: { 'countries.$.scratched': scratched } };

      const createCountryQuery = {
        $push: {
          countries: { country_code, name, scratched }
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

          const response = {
            username: updatedUser.username,
            countries: updatedUser.countries,
          }

          return res.status(200).json(response);
        } catch (err) {
          if (DEV) console.log(err);
          return res
            .status(400)
            .json({ error: 'Failed to update scratched status!' });
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

          const response = {
            username: updatedUser.username,
            countries: updatedUser.countries,
          }

          return res.status(201).json(response);
        } catch (err) {
          return res
            .status(409)
            .json({ error: 'Failed to create a new country and update scratched status!' });
        }
// >>>>>>> master
      }
    } catch (err) {
      if (DEV) console.log(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
};
