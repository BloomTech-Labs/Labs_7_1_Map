const mongoose = require('mongoose');
const argon2 = require('argon2');

const DEV = process.env.DEV || null;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      minlength: 6
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    firstname: String,
    lastname: String,
    facebook: {
      id: String,
      accessToken: String,
      refreshToken: String,
      email: String,
      last_name: String,
      first_name: String
    },
    countries: [
      {
        country_code: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        status_code: {
          type: Number,
          default: 0
        }, // 0, 1, 2, 3, 4 (represents the status options for a country)
        notes: {
          type: String,
          default: ''
        },
        scratched: {
          type: Boolean,
          default: false
        }
      }
    ],
    preferences: {
      theme: {
        type: String,
        required: true,
        default: 'standard'
      },
      autoscratch: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  },
  { timestamps: true }
);

// Hash password before registering a new user
// Mongoose does not support pre-update hooks so password is hashed in
// `user_controller.js` when updating an existing user
UserSchema.pre('save', async function(next) {
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    if (DEV) {
      console.log(err);
    }
  }
});

// Validate a plain text password with the hash stored in DB
UserSchema.methods.check_password = async function(entered_password) {
  try {
    return await argon2.verify(this.password, entered_password);
  } catch (err) {
    if (DEV) {
      console.log(err);
    }
  }
};

module.exports = mongoose.model('User', UserSchema);
