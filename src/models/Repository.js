const { Schema, model } = require('mongoose');

const RepositorySchema = new Schema(
	{
		dev_id: {
			type: String,
			required: true,
			tags: { index: true }
		},
		name: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		},
		size: Number,
		language: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

module.exports = model('Repository', RepositorySchema);
