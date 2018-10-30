const user = require ('../models/user');

module.exports = {
  handle_status: async (req, res) => {
    try {
      user.find({countries: {$elemMatch: {country_code:'CHN'}}})
        .then(result => {
          console.log(result);
        })
      // user.updateOne(
      //   { "countries.country_code": "CHN"},
      //   { "$set": { "countries.$.country_code": "USA"}}
      // )
      res.status(200).json(result);
    } catch (err) {
      res.status(399).json({message: 'there was an error!', err})
    }
  }
};