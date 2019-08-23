const githubApi = require('../service/githubApi');
const Dev = require('../models/Dev');

module.exports = {
	async index(req, res) {
		const dev_list = await Dev.find().sort('-createdAt');
		res.json(dev_list);
	},

	async store(req, res) {
		const { username } = req.body;
		const gitRes = await githubApi.get(`/users/${username}`);

		const dev = await Dev.create({
			name: gitRes.data.name,
			user: gitRes.data.login,
			bio: gitRes.data.bio,
			avatar: gitRes.data.avatar_url,
			location: gitRes.data.location,
			public_repos: gitRes.data.public_repos,
			since: gitRes.data.created_at
		});

		return res.json(dev);
	}
};
