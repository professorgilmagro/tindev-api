require('dotenv').config();

const express = require('express');
const dbConfig = require('./config/db');
const mongoose = require('mongoose');
const routes = require('./routes');
const server = express();

mongoose.connect(dbConfig.mongo.getConnectionString(), {
    useNewUrlParser: true
});

server.use(express.json());
server.use(routes);

const server_port = process.env.SERVER_PORT;
server.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});
