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
  handle_status: (req, res) => {
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
    
    // Route for Notes based on Country
    
  }
};
