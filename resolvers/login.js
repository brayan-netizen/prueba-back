const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (_, { email, password }) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error('Usuario no encontrado');

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw new Error('Contraseña incorrecta');

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1h'
	});
	return token;
};

module.exports = login;
