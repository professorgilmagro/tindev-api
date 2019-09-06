const githubApi = require('../service/githubApi');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const loggedDev = await Dev.findById(req.headers.user);
        const dev_list = await Dev.find({
            $and: [
                { _id: { $ne: loggedDev._id } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.unlikes } }
            ]
        });
        res.json(dev_list);
    },

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });
        if (userExists) {
            return res.json(userExists);
        }

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
