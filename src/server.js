require('dotenv').config();

const express = require('express');
const dbConfig = require('./config/db');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(dbConfig.mongo.getConnectionString(), {
	useNewUrlParser: true
});

const connectedUsers = {};
io.on('connection', socket => {
	const { user } = socket.handshake.query;
	connectedUsers[user] = socket.id;
	console.log('Nova connexão IO %s@%s', user, socket.id);
	console.table(connectedUsers);
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;
	next();
});

app.use(express.json());
app.use(cors());
app.use(routes);

const app_port = process.env.SERVER_PORT || process.env.PORT;
server.listen(app_port, function() {
	console.log('Listening on port %d', app_port);
});
