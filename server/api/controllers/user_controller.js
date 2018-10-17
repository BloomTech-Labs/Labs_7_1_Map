const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
    create_user: (req, res) => {
        //destructuring for validation
        const { username, password, email} = req.body;
        if ((username === undefined) || (password === undefined) || (email === undefined)) {
            return res.status(400).json({error: 'username, password, and email required for registration'});
        }
        if (password.length < 6) {
            return res.status(400).json({error: 'password must be of length greater than 6!'});
        }

        //collect the user information
        const user_info = { ...req.body};
        
        //create a new user
        const new_user = new User(user_info);

        new_user.save()
            .then( created_user => {
                res.status(200).json(created_user)
            }).catch( err => {
                console.log(err);
                res.status(500).json({error: 'failed user creation'})
            })

    } //create_user
}; //module.eports