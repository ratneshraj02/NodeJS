import express from 'express';
import { userRouter, adminRouter } from './routers/index.js';
import { tokenMiddleware } from './middleware/index.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(tokenMiddleware);

app.get('/', function (req, res) {
	res.send('Hello World');
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
	console.log(`Server is listening port : ${port}`);
});
