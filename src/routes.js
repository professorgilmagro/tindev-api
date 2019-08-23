const express = require('express');
const routes = express.Router();
const DevController = require('./controllers/DevController');

routes.get('/', (req, res) => {
	res.json({ message: `Hello World` });
});

routes.get('/api/v1/devs', DevController.index);
routes.post('/api/v1/devs', DevController.store);

module.exports = routes;
