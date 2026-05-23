import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { createClient } from 'redis';
import { connectDB, getDB } from './db/connect.js';
import { redisClient } from './config/redis.js';
import { getProductColor } from './model/productModel.js';
import { getProductColorFromCache } from './redis/productModelCache.js';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
	console.log('input');
});

app.get('/data', async (req, res) => {
	const uInput = (req.query.color || '').trim();

	if (!uInput) {
		return res.status(400).send({ error: 'Color is required' });
	}

	let cached = await getProductColorFromCache(uInput);

	if (cached) {
		return res.json(JSON.parse(cached));
	} else {
		//as data is not from redis get from mongo
		const output = [];
		const cursor = await getProductColor(uInput);

		for (const data of cursor) {
			output.push(data);
		}

		await redisClient.set(uInput, JSON.stringify(output), {
			EX: 10,
			NX: true,
		});

		await cursor.close;

		res.send({ source: 'MongoDB', output });
	}
});

app.listen(port, () => {
	//connect to db
	connectDB();
	//connect redis
	// redisClient.connect();
	console.log(`Server is listening : ${port}`);
});
