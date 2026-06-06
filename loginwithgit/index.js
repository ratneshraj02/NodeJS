import express from 'express';
import cors from 'cors';
import superagent from 'superagent';

const app = express();
app.use(cors());
const port = 8000;



app.get('/', (req, res) => {
	res.send('<a href="https://github.com/login/oauth/authorize?client_id"> Login With Github</a>');
});

app.listen(port, () => {
	console.log(`Server is listening port ${port}`);
});
