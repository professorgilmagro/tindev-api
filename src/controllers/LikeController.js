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
			console.log('Deu match!');
		}

		await loggedDev.save();
		return res.send(loggedDev);
	}
};
