import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const MongoUrl = process.env.MONGO_URL;

const client = new MongoClient(MongoUrl);

//db name
const dbName = 'aprnode';

let db;

async function connectDB() {
	try {
		client.connect();
		db = client.db(dbName);
		console.log('Database is connected');
	} catch (err) {
		console.log('Database Error :', err);
	}
}

function getDB() {
	return db;
}

export { connectDB, getDB };
