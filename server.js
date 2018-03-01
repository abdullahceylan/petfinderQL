const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./data/schema');

const app = express();
const port = 4000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(port);
console.log("Listening...");