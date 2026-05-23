import express from 'express';
import axios from 'axios';
import redis from 'redis';

const app = express();

const port = process.env.PORT || 8000;

const client = redis.createClient({
	url: 'redis://localhost:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
console.log('redis connected');

app.get('/data', async (req, res) => {
	let userInput = req.query.country || 'India';
	const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
	// check redis cache
	const result = await client.get(userInput);

	// if cache exists
	if (result) {
		return res.json(JSON.parse(result));
	}

	// fetch from API
	const response = await axios.get(url, {
		headers: {
			'User-Agent': 'MyNodeApp',
		},
	});

	const output = response.data;
	console.log(output);

	// save in redis for 1 hour
	await client.setEx(userInput, 3600, JSON.stringify(output));

	// return API response
	res.json(output);
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
