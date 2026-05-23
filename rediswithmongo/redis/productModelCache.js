import { redisClient } from '../config/redis.js';

const rClient = redisClient.connect();
const client = redisClient;

async function getProductColorFromCache(uInput) {
	const result = await client.get(uInput);

    if (result) {
        client.set(uInput, JSON.stringify({ source: 'Redis cache', result }), {
            EX: 10,
            NX: true,
        });

        return result;
    }
}

export { getProductColorFromCache };
