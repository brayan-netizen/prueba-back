const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const productsQuery = require('./queries/products');

const register = {
	type: GraphQLString,
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	async resolve(_, { email, password }) {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ email, password: hashedPassword });
		await user.save();
		return 'Usuario registrado con éxito';
	}
};

const login = {
	type: GraphQLString,
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	async resolve(_, { email, password }) {
		const user = await User.findOne({ email });
		if (!user) throw new Error('Usuario no encontrado');

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) throw new Error('Contraseña incorrecta');

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1h'
		});
		return token;
	}
};

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		products: productsQuery,
		hello: {
			type: GraphQLString,
			resolve: () => 'Hola mundo'
		}
	}
});

const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		register,
		login
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
