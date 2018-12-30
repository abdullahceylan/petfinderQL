'use strict';

require('dotenv/config');

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./server.js');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
