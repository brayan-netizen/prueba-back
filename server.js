require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

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
	console.log('Servidor corriendo en http://localhost:4000/graphql')
);
