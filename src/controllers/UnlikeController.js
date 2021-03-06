const Dev = require('../models/Dev');

module.exports = {
	async store(req, res) {
		const targetDev = await Dev.findById(req.params.uid);
		if (!targetDev) {
			res.status(400).json({ message: 'Dev not found' });
		}

		const loggedDev = await Dev.findById(req.headers.user);
		if (loggedDev.unlikes.includes(targetDev._id)) {
			return res.send(loggedDev);
		}

		loggedDev.unlikes.push(targetDev._id);

		await loggedDev.save();
		return res.send(loggedDev);
	}
};
