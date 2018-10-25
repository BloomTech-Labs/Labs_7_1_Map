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
    countries: {
      country_code: String,
      name: String,
      postion: {
        longitude: Number,
        latitude: Number
      },
      status: String,
      notes: String
    },
    social: [
      {
        provider: String,
        id: String
      }
    ],
    notes: [
      {
        type: ObjectIdSchema,
        ref: 'Note'
      }
    ]
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
