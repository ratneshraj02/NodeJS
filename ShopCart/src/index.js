const express = require('express');
const { PORT } = require('./config/serverConfig.js');

const app = express();


app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`server is listening port ${PORT}`);
});
