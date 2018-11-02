const mongoose = require('mongoose');
const argon2 = require('argon2');

const DEV = process.env.DEV || null;

const Schema = mongoose.Schema;
//const ObjectIdSchema = Schema.Types.ObjectId;

// define a user schema
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
        }, //0, 1, 2, 3, 4
        notes: String,
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
        default: 'dark'
      },
      autoscratch: {
        type: Boolean,
        required: true,
        default: false
      }
    }
    // social: [
    //   {
    //     provider: String,
    //     id: String
    //   }
    // ]
  },
  {
    timestamps: true
  }
);

// hash password
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

// check password
UserSchema.methods.check_password = async function(entered_password) {
  try {
    return await argon2.verify(this.password, entered_password);
  } catch (err) {
    if (DEV) {
      console.log(err);
    }
  }
};

// export the user schema
module.exports = mongoose.model('User', UserSchema);
