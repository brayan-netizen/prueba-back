require('dotenv').config();
const axios = require('axios');

const products = async (_, { productId }) => {
	const response = await axios.get(
		`${process.env.DOMAIN_VTEX}/api/catalog_system/pub/products/search/?fq=productId:${productId}`
	);

	return response.data?.[0];
};

module.exports = products;
