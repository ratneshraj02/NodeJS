import express from 'express';
import { userRouter, adminRouter } from './routers/index.js';
import { authenticationMiddleware } from './middleware/authMiddleware.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
	return res.json({ status: 'Server is up and running' });
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
	console.log(`Server is listening port : ${port}`);
});
