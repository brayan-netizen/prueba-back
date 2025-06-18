const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const login = async (_, { email, password }) => {
	const user = await User.findOne({ email }).populate('roles');
	if (!user) throw new Error('User not found');
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new Error('Incorrect password');
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1d'
	});
	return { token, user };
};

module.exports = login;
