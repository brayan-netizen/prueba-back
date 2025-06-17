// schema/types/ProductType.js
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		productId: { type: GraphQLString },
		productName: { type: GraphQLString },
		brand: { type: GraphQLString },
		link: { type: GraphQLString },
		description: { type: GraphQLString },
		imageUrl: { type: GraphQLString },
		color: { type: new GraphQLList(GraphQLString) },
		genero: { type: new GraphQLList(GraphQLString) },
		linea: { type: new GraphQLList(GraphQLString) }
	})
});

module.exports = ProductType;
