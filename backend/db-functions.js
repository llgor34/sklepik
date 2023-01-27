const { MongoClient } = require('mongodb');

const dbClient = new MongoClient('mongodb://127.0.0.1:27017');

async function findOne(collectionName, condition) {
	await dbClient.connect();

	const collection = dbClient.db('sklepik').collection(collectionName);
	const record = await collection.findOne(condition);

	await dbClient.close();

	return record;
}

async function updateOne(collectionName, condition, data) {
	await dbClient.connect();

	const collection = dbClient.db('sklepik').collection(collectionName);
	// await collection.updateOne(condition, data);
	const res = await collection.findOne(condition);

	await dbClient.close();

	return res;
}

async function getLastElementInCollection(collectionName) {
	await dbClient.connect();
	const lastElement = dbClient.db('sklepik').collection(collectionName).find().limit(1).sort({ $natural: -1 });
	await dbClient.close();

	return lastElement;
}

module.exports = { findOne, updateOne, getLastElementInCollection };
