require('dotenv').config();

const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { readFileSync } = require('fs');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const User = require('./models/User');
const resolvers = require('./graphql/resolvers');

const app = express();

const typeDefs = readFileSync('./graphql/schema.graphql', 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB conectado'))
	.catch((err) => console.error(err));

app.use(
	cors({
		origin: '*',
		credentials: true
	})
);

app.use(
	'/graphql',
	graphqlHTTP(async (req) => {
		let user = null;

		const authHeader = req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace('Bearer ', '');

			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				user = await User.findById(decoded.userId).populate('roles');
			} catch (error) {
				console.log('Invalid token:', error.message);
			}
		}

		return {
			schema,
			graphiql: true,
			context: { user }
		};
	})
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
	console.log(`Servidor listo en http://localhost:${PORT}/graphql`)
);
