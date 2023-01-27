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

	await dbClient.db('sklepik').collection(collectionName).updateOne(condition, data);

	await dbClient.close();
}

async function getLastElementInCollection(collectionName) {
	await dbClient.connect();

	const lastElement = await dbClient.db('sklepik').collection(collectionName).find().sort({ _id: -1 }).limit(1).toArray();

	await dbClient.close();

	return lastElement[0];
}

module.exports = { findOne, updateOne, getLastElementInCollection };
