require('dotenv/config');

const express = require('express');
const graphqlHTTP = require('express-graphql');
const chalk = require('chalk');
const boxen = require('boxen');
const cors = require('cors');
const schema = require('./data/schema');

const isDev = process.env.NODE_ENV !== 'production';
const graphiQL = process.env.GRAPHIQL === 'true';

const app = express();
const port = process.env.PORT || 4000;

/**********
  OPTIONS
***********/
const corsConfig = {
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['POST'],
  origin: true,
  credentials: true
};

const boxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'gray'
};

const listenMessage = (p = port) =>
  chalk.gray(
    `
  petfinderQL server is running. Type rs + enter
  at any time to restart the server

  ${chalk.blue.bold('Healthcheck')} → ${chalk.blue(
      `http://localhost:${p}/healthcheck`
    )}

  ${chalk.blue.bold('petfinderQL')} → ${chalk.blue(`http://localhost:${p}`)} 
`
  );

/***********
  ROUTING
************/
app.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

app.use(
  '/',
  cors(corsConfig),
  graphqlHTTP({
    schema,
    graphiql: isDev || graphiQL
  })
);

app.listen(port, () => {
  console.log(boxen(listenMessage(), boxOptions));
});

/**
  Catch and handle any error occurring in the server process
*/
let newPort = port;

process.on('uncaughtException', error => {
  if (error.errno === 'EADDRINUSE') {
    newPort = newPort + 1;
    const message = `
  Cannot bind to the port ${error.port}.
    
  ${chalk.green(`New port is ${newPort}`)}

    ${listenMessage(newPort)}
    `;

    app.listen(newPort);

    console.log(boxen(chalk.red(message), boxOptions));
  } else {
    console.log('Some error occurred', error);
  }
});
