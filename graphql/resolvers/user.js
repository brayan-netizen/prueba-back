const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const permission = require('../../utils/permission');

const generateUsername = async (name, lastName) => {
	const base = `${name}${lastName}`.toLowerCase().replace(/\s/g, '');
	let username = base;
	let exists = await User.findOne({ username });

	// Si ya existe, agrega un número aleatorio
	while (exists) {
		const random = Math.floor(Math.random() * 1000); // Ej: juanperez123
		username = `${base}${random}`;
		exists = await User.findOne({ username });
	}

	return username;
};

const users = async (_, __, { user }) => {
	checkPermission(user, permission.readUsers);
	return User.find().populate('roles');
};
const user = (_, { id }, { user }) => {
	checkPermission(user, permission.readUser);

	return User.findById(id).populate('roles');
};

const registerUser = async (_, args, { user }) => {
	checkPermission(user, permission.createUser);

	const { email, password, roleIds, ...rest } = args;

	// Verificar que ningún rol sea "Super Admin"
	const assignedRoles = await Role.find({ _id: { $in: roleIds } });

	const hasSuperAdmin = assignedRoles.some(
		(role) => role.name === 'Super Admin'
	);
	if (hasSuperAdmin) {
		throw new Error('Cannot assign "Super Admin" role');
	}

	const hashed = await bcrypt.hash(password, 10);

	const NUser = new User({
		...rest,
		email,
		password: hashed,
		roles: roleIds
	});

	await NUser.save();
	return 'User successfully registered';
};

const updateUser = async (
	_,
	{ id, password, roleIds, name, lastName, ...rest },
	{ user }
) => {
	checkPermission(user, permission.updateUser);

	const data = { ...rest };

	if (name) data.name = name;
	if (lastName) data.lastName = lastName;

	if (name && lastName) {
		data.username = await generateUsername(name, lastName);
	}

	if (password) {
		data.password = await bcrypt.hash(password, 10);
	}

	if (roleIds) {
		// Validar que no incluya el rol "Super Admin"
		const assignedRoles = await Role.find({ _id: { $in: roleIds } });

		const hasSuperAdmin = assignedRoles.some(
			(role) => role.name === 'Super Admin'
		);
		if (hasSuperAdmin) {
			throw new Error('Cannot assign "Super Admin" role');
		}

		data.roles = roleIds;
	}

	return User.findByIdAndUpdate(id, data, { new: true }).populate('roles');
};

const deleteUser = async (_, { id }, { user }) => {
	checkPermission(user, permission.deleteUser);

	const targetUser = await User.findById(id).populate('roles');
	if (!targetUser) throw new Error('User not found');

	const isSuperAdmin = targetUser.roles.some(
		(role) => role.name === 'Super Admin'
	);
	if (isSuperAdmin) {
		throw new Error('Cannot delete a user with the "Super Admin" role');
	}

	await User.findByIdAndDelete(id);
	return true;
};

module.exports = {
	users,
	user,
	registerUser,
	updateUser,
	deleteUser
};
