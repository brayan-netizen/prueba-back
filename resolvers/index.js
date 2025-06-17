const login = require('./login');
const products = require('./products');
const product = require('./product');
const register = require('./registerUser');

const resolvers = {
	Query: {
		product,
		products
	},
	Mutation: {
		login,
		register
	}
};

module.exports = resolvers;
