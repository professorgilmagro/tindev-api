require('dotenv').config();

const db = require('../config/db');

test('get-query-connection', () => {
	const stringConn = db.mongo.getConnectionString();
	expect(stringConn).toContain('mongodb+srv');
});
