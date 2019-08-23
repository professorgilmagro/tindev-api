const { Schema, model } = require('mongoose');

const DevSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		user: {
			type: String,
			required: true
		},
		bio: String,
		avatar: {
			type: String,
			required: true
		},
		location: String,
		public_repos: Number,
		since: Date
	},
	{
		timestamps: true
	}
);

module.exports = model('Dev', DevSchema);
