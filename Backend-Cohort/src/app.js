import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './modules/auth/auth.router.js';
import ApiError from './common/utils/api-error.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);

//Catch-all undefined route
app.use("${*path}", (req, res) => {
    throw ApiError.notfound(`Route ${req.originalUrl} not found`);
})

export default app;