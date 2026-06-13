import express from 'express';
import bookRouter from './routes/book.routes.js'
import { loggerMiddleware } from './middleware/logger.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 8000;

//middleware (plugins)

//middleware to logs

app.use(express.json());
app.use(loggerMiddleware);


app.use(express.Router());



//router
app.use('/books', bookRouter);

app.listen(port, () => {
	console.log(`Sever is listening :${port}`);
});
