const User = require('../models/user');

module.exports = {
  handle_status: (req, res) => {
    const username = 'SuperKewl';
    const countryToEdit = 'USA';
    const countryThatIsIn = 'AUS';

    const query1 = {
      $and: [
        { 'username': username },
        {
          'countries': {$elemMatch: {'country_code': 'CAN'}}
        }
      ]
    };

    const query = {
      "username": username
      // "username":  {$elemMatch: {country_code:"AUS"}}
    };

    const query2 = {
      "countries.country_code": "AUS"
    }
    const sort = [];
    const operator1 = {
      $set: {
        'countries.$.country_code': 'CAN'
      }
    };

    const operator2 = {
      $push: {
        countries: {
          country_code: 'CAN',
          name: 'Canada',
          status_code: 0,
          notes: ''
        }
      }
    };
    const options = {
      new: true
    };

    const options2 = {};

    //i have to use a query to select the document which i have to update,
    //however when pushing to the array, that is because there is none in there
    //so how do i query something because it's missing an item?

    User.findOne(query1).then(result => {
      console.log(result);
      if (result !== null) {
      User.findOneAndUpdate(query2, operator1, options)
        .then( newDoc => {
        res.status(200).json(newDoc);
        })
        .catch( err => {
          console.log(err, '1');
        })
      } else {
        User.updateOne(query, operator2)
          .then( newDoc => {
            res.status(201).json(newDoc);
          })
          .catch( err => {
            console.log(err, '2');
          })
      }
    })
    // .catch( err => {
    //   console.log('findOne broken', err);
    // })
  }
};

//     User.updateOne(query, operator2)
//       .then( newDoc => {
//         res.status(201).json(newDoc);
//       })
//   }
// };

//below paragraph is good

// User.findOneAndUpdate(query, operator, options)
//   .then( newDoc => {
//     res.status(200).json(newDoc);
//   })

// if(err) throw err;
// if(!doc) {
//   console.log("did not update");
// }
// else {
//   console.log(doc);

// return db.close();

//ok so now i can find and update an object within the array
// i need to first check if the object is in there

// user.find({countries: {$elemMatch: {country_code:'CHN'}}})
// .then(result => {
//   res.status(200).json(result);
// user
// .updateOne(query, update);
// .catch( err => {
//   res.status(399).json({message: 'there was an error!', err})
// })

// .catch( err => {
//   res.status(399).json({message: 'there was an error!', err})
// })
/*

  */

// user.find({countries: {$elemMatch: {country_code:'CHN'}}})
//   .then(result => {
//     console.log(result);
//     res.status(200).json(result);
//   })
// // user.updateOne(
// //   { "countries.country_code": "CHN"},
// //   { "$set": { "countries.$.country_code": "USA"}}
// // )
// .catch( err => {
//   res.status(399).json({message: 'there was an error!', err})
// })

// handle_status: async (req, res) => {
//   const query = {countries: {$elemMatch: {country_code:'CHN'}}}
//   const sort  [];
//   const operator = { <operator1>: {}}
//   user.findAndModify()
//   }
