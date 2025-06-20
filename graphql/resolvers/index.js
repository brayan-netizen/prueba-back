const login = require('./login');
const { product, products } = require('./products');

const { users, user, registerUser, updateUser, deleteUser } = require('./user');

const { roles, role, createRole, updateRole, deleteRole } = require('./role');

const resolvers = {
	Query: {
		product,
		products,
		users,
		user,
		roles,
		role
	},
	Mutation: {
		login,
		registerUser,
		updateUser,
		deleteUser,
		createRole,
		updateRole,
		deleteRole
	}
};

module.exports = resolvers;
