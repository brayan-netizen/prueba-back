// schema/types/PaginatedProductsType.js
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList
} = require('graphql');
const ProductType = require('./ProductType');

const PaginatedProductsType = new GraphQLObjectType({
	name: 'PaginatedProducts',
	fields: () => ({
		total: { type: GraphQLInt },
		totalPages: { type: GraphQLInt },
		hasNextPage: { type: GraphQLBoolean },
		items: { type: new GraphQLList(ProductType) }
	})
});

module.exports = PaginatedProductsType;
