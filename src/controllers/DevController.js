const githubApi = require('../service/githubApi');
const Dev = require('../models/Dev');
const Repository = require('../models/Repository');
const autoBind = require('auto-bind');
class DevController {
	constructor() {
		autoBind(this);
	}

	async index(req, res) {
		const id = req.headers.user;
		const type = req.params.filterBy;
		const loggedDev = await Dev.findById(id);

		if (!loggedDev) {
			return res.status(401).json({ message: 'Usuário não logado' });
		}

		const dev_list = await Dev.find(
			this.__getFilters(type, loggedDev)
		).populate('repositories');

		res.json(dev_list);
	}

	async store(req, res) {
		const { username } = req.body;

		const userExists = await Dev.findOne({ user: username });
		if (userExists) {
			const repos = userExists.repositories;
			if (repos !== undefined || repos.lenght === 0) {
				await this.__fillRepositories(userExists);
			}

			return res.json(userExists);
		}

		const gitRes = await githubApi
			.get(`/users/${username}`)
			.catch(({ response }) => {
				console.log(
					`${response.headers.status} - ${response.config.url}`
				);
			});

		if (gitRes === undefined || gitRes.data === undefined) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}

		const devInfo = gitRes.data;
		const dev = await Dev.create({
			name: devInfo.name,
			user: devInfo.login,
			bio: devInfo.bio,
			avatar: devInfo.avatar_url,
			location: devInfo.location,
			public_repos: devInfo.public_repos,
			since: devInfo.created_at
		});

		await this.__fillRepositories(dev);
		return res.json(dev);
	}

	async __fillRepositories(dev) {
		const repos_url = `/users/${dev.user}/repos`;
		const gitRepos = await githubApi.get(repos_url).catch(error => {
			return false;
		});

		const repositories = [];
		await Promise.all(
			gitRepos.data.map(async repo => {
				const rep = await Repository.create({
					dev_id: dev._id,
					name: repo.name,
					url: repo.html_url,
					size: repo.size,
					language: repo.language
				}).catch(error => {
					console.table(error);
				});
				repositories.push(rep._id);
			})
		);

		dev.repositories = repositories;
		await dev.save();
		return true;
	}

	__getFilters(type, dev) {
		if (type === 'unlikeds') {
			return {
				$and: [{ _id: { $in: dev.unlikes } }]
			};
		}

		if (type === 'likeds') {
			return {
				$and: [{ _id: { $in: dev.likes } }]
			};
		}

		return {
			$and: [
				{ _id: { $ne: dev._id } },
				{ _id: { $nin: dev.likes } },
				{ _id: { $nin: dev.unlikes } }
			]
		};
	}
}

module.exports = new DevController();
