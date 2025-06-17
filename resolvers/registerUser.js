const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (_, { email, password }) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({ email, password: hashedPassword });
	await user.save();
	return 'Usuario registrado con éxito';
};

module.exports = register;
