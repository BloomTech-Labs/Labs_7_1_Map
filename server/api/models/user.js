const mongoose = require('mongoose');
const argon2 = require('argon2');

const Schema = mongoose.Schema;
ObjectIdSchema = Schema.ObjectId;

// define a user schema
const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		firstname: String,
		lastname: String,
		social: [
			{
				provider: String,
				id: String,
			},
		],
		notes: [
			{
				type: ObjectIdSchema,
				ref: 'Note'

			}

		]
	},
	{
		timestamps: true,
	}
);

// hash password
UserSchema.pre('save', async function(next) {
	try {
		this.password = await argon2.hash(this.password);
		next();
	} catch (err) {
		console.log(err);
	}
});

// check password
UserSchema.methods.check_password = async function(entered_password) {
	try {
		return await argon2.verify(this.password, entered_password);
	} catch (err) {
		console.log(err);
	}
};

// export the user schema
module.exports = mongoose.model('User', UserSchema);
