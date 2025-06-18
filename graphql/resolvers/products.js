require('dotenv').config();
const axios = require('axios');

const products = async (_, { from: OFrom = 1, to: Oto = 10, search = '' }) => {
	const from = OFrom === 0 ? OFrom : OFrom - 1;
	const to = OFrom === 0 ? Oto : Oto - 1;

	const response = await axios.get(
		`${process.env.DOMAIN_VTEX}/api/catalog_system/pub/products/search/${search}?_from=${from}&_to=${to}`
	);

	const resourcesHeader = response.headers['resources']; // Ej: "0-10/999"

	let pagination = {
		currentItemFrom: from,
		currentItemTo: to,
		tableLength: 0,
		itemsLength: 0,
		currentPage: 0
	};

	if (resourcesHeader) {
		const [range, totalStr] = resourcesHeader.split('/');
		const [fromStr, toStr] = range.split('-');

		const pageSize = to - from + 1;

		pagination = {
			...pagination,
			itemsLength: response.data.length,
			currentItemFrom: parseInt(fromStr) + 1,
			currentItemTo: parseInt(toStr) + 1,
			tableLength: parseInt(totalStr),
			currentPage: Math.floor(from / pageSize) + 1
		};
	}

	return {
		pagination,
		items: response.data
	};
};

module.exports = products;
