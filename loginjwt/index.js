import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import authController from './controller/authController.js';

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());



app.use('/api/auth/', authController);




app.listen(port, () => {
	connectDB();
	console.log(`Sever is listening port : ${port}`);
});
