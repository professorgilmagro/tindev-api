const Dev = require('../models/Dev');

module.exports = {
	async store(req, res) {
		const targetDev = await Dev.findById(req.params.uid);
		if (!targetDev) {
			res.status(400).json({ message: 'Dev not found' });
		}

		const loggedDev = await Dev.findById(req.headers.user);
		if (loggedDev.likes.includes(targetDev._id)) {
			console.log('Já deu like em algum outro momento!');
			return res.send(loggedDev);
		}

		loggedDev.likes.push(targetDev._id);
		if (targetDev.likes.includes(loggedDev._id)) {
			const loggedSocket = req.connectedUsers[loggedDev._id];
			const targetSocket = req.connectedUsers[targetDev._id];

			// emite uma mensagem de match para o dev que deu o like
			if (loggedSocket) {
				req.io.to(loggedSocket).emit('match', targetDev);
				console.log('IT`S A MATCH LOGGED! %s', loggedDev._id);
			}

			// emite uma mensagem de match para o dev que recebeu o like
			if (targetSocket) {
				req.io.to(targetSocket).emit('match', loggedDev);
				console.log('IT`S A MATCH TARGET! %s', targetDev._id);
			}
		}

		await loggedDev.save();
		return res.send(loggedDev);
	}
};
