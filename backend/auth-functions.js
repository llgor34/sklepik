const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(userId) {
	return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET, {
		expiresIn: '1800s',
	});
}

module.exports.generateAccessToken = generateAccessToken;
