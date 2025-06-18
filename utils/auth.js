const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.getUserFromToken = async (token) => {
	try {
		if (!token) return null;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).populate('roles');
		return user;
	} catch (err) {
		console.log(err);
		return null;
	}
};
