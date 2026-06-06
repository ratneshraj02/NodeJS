import express from 'express';
import cors from 'cors';
import superagent from 'superagent';

const app = express();
app.use(cors());
const port = 8000;



app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(port, () => {
	console.log(`Server is listening port ${port}`);
});
