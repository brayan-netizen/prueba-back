require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const resolvers = require('./resolvers');

const app = express();

const typeDefs = readFileSync('./schema.graphql', 'utf8');
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
		origin: '*', // o '*' para todos los orígenes
		credentials: true
	})
);

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
	console.log(`Servidor listo en http://localhost:${PORT}/graphql`)
);
