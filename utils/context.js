const { getUserFromToken } = require('./auth');

module.exports = async ({ req }) => {
	const token = req.headers.authorization || '';
	const user = await getUserFromToken(token.replace('Bearer ', ''));
	return { user };
};
