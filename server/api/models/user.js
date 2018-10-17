const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: String,
    lastname: String,
    // social: [{
    //     type: Object,
    // }],
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);