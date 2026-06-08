import http from 'http';
import fs from 'fs';

const app = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;

	const log = `[${Date.now()}] : ${url}${method} \n`;
	fs.appendFileSync('log.txt', log, 'utf-8');

	if (url == '/' && method == 'GET') {
		res.writeHead(200).end('Hello');
	} else if (url == '/contactUs' && method == 'GET') {
		res.writeHead(200).end('Ratnsh Kumar, rk02ratnesh@gmail.com');
	} else if (url == '/tweet' && method == 'POST') {
		res.writeHead(200).end('Action is done');
	} else if (url == '/tweet') {
		res.writeHead(200).end('The user is sended');
	}
});

app.listen(7000, () => {
	console.log('Server is listening');
});
