const express = require('express');
const routes = express.Router();
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const UnlikeController = require('./controllers/UnlikeController');

routes.get('/', (req, res) => {
	res.json({ message: `Hello World` });
});

routes.get('/api/v1/devs', DevController.index);
routes.post('/api/v1/devs', DevController.store);
routes.post('/api/v1/devs/:uid/like', LikeController.store);
routes.post('/api/v1/devs/:uid/unlike', UnlikeController.store);

module.exports = routes;
