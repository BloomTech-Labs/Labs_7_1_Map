const User = require ('../models/user');

module.exports = {
  handle_status: (req, res) => {

    const query = {
      "countries": {$elemMatch: {country_code:"BGN"}}
    };
    const sort = [];
    operator = {
      "$set": {
        "countries.$.country_code": "USA"
      }
    };
    const options = { 
      'new': true,
   };
        
    User.findOne(query)
    .then(result => {
      if (result !== null) {
        //find and update here
        User.findOneAndUpdate(query, operator, options)
          .then( newDoc => {
          res.status(200).json(newDoc);
          })
      } else {
        //create here
        console.log(result);
      }
    });







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
      }

  };


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