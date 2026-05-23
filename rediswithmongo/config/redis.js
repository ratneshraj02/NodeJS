import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
	console.log('Redis Error :', err);
});

async function connectRedis() {
	await redisClient.connect();

	console.log('Redis Connected');
}

export { redisClient };