// schema/queries/products.js
const axios = require('axios');
const { GraphQLInt } = require('graphql');
const PaginatedProductsType = require('../types/PaginatedProductsType');

const productsQuery = {
	type: PaginatedProductsType,
	args: {
		page: { type: GraphQLInt },
		pageSize: { type: GraphQLInt }
	},
	async resolve(_, { page = 1, pageSize = 10 }) {
		const offset = (page - 1) * pageSize;
		const from = offset;
		const to = offset + pageSize - 1;

		const response = await axios.get(
			`https://offcorss.myvtex.com/api/catalog_system/pub/products/search/?_from=${from}&_to=${to}`
		);

		const allData = await axios.get(
			`https://offcorss.myvtex.com/api/catalog_system/pub/products/search`
		);

		const total = allData.data.length;
		const totalPages = Math.ceil(total / pageSize);
		const hasNextPage = page < totalPages;

		return {
			total,
			totalPages,
			hasNextPage,
			items: response.data.map((product) => ({
				productId: product.productId,
				productName: product.productName,
				brand: product.brand,
				link: product.link,
				description: product.description,
				imageUrl: product.brandImageUrl,
				color: product.Color,
				genero: product['Género'],
				linea: product.linea
			}))
		};
	}
};

module.exports = productsQuery;
