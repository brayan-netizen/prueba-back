const login = require('./login');
const products = require('./products');
const register = require('./registerUser');

const resolvers = {
	Query: {
		products
	},
	Mutation: {
		login,
		register
	}
};

module.exports = resolvers;
