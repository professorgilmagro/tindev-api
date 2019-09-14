require('dotenv').config();

module.exports = {
	mongo: {
		uri:
			'mongodb+srv://[USERNAME]:[PASSWORD]@[HOST]/[COLLECTION_NAME]?retryWrites=true&w=majority',
		getConnectionString() {
			return this.uri
				.replace('[USERNAME]', process.env.DB_USERNAME)
				.replace('[PASSWORD]', process.env.DB_PASSWORD)
				.replace('[HOST]', process.env.DB_HOST)
				.replace('[COLLECTION_NAME]', process.env.DB_COLLECTION_NAME);
		},
		options: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		}
	}
};
