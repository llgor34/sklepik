const { MongoClient } = require('mongodb');

const dbClient = new MongoClient('mongodb://127.0.0.1:27017');

async function findOne(collectionName, condition) {
	await dbClient.connect();

	const collection = dbClient.db('sklepik').collection(collectionName);
	const record = await collection.findOne(condition);

	await dbClient.close();

	return record;
}

module.exports.findOne = findOne;
