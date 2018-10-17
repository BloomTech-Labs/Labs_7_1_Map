const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET || 'No secret set';

module.exports = {
	make_token: function(user) {
		const payload = { sub: user._id, iat: new Date().getTime(), username: user.username };
		const options = { expiresIn: '1d' };
		return jwt.sign(payload, secret, options);
	},
	verify_token: function(req, res, next) {
		const token = req.headers['x-access-token'];
		jwt.verify(token, secret, (err, decode) => {
			if (err) {
				return res.status(500).json({ token: 'Token is invalid' });
				req.user = decoded.user;
				next();
			}
		});
	},
};
