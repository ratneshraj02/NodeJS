import express from 'express';

const app = express();

const port = 8000;

app.get('/', (req, res) => {
	res.send('Home Page');
});

app.get('/contact', (req, res) => {
	res.statusMessage(210).send('You can contact me at my email address');
});

app.get('/tweet', (req, res) => {
    res.send("Here your all tweet");
 });

app.post('/tweet', (req, res) => {
    res.status(210).send("Tweet is created");
 });

app.listen(port, () => {
	console.log(`Server is listening port ${port}`);
});
