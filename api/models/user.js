const mongoose = require('mongoose');
const argon2 = require('argon2');

const DEV = process.env.DEV || null;

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.Types.ObjectId;

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
      required: true,
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
      token: String,
      email: String,
      name: {
        familyName: String,
        givenName: String
      }
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
        notes: String
      }
    ]
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
    if (Dev) {
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

//get all notes for user
UserSchema.methods.get_notes = async function() {
  await this.populate('notes');
};

// export the user schema
module.exports = mongoose.model('User', UserSchema);
