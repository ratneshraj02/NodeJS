import cookieParser from 'cookie-parser';
import express from 'express';
import { currentRequest } from './middleware/request.middleware.js';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
);

app.use(
    express.json({
        limit: '16kb',
    }),
);

app.use(
    express.urlencoded({
        extended: true,
        limit: '16kb',
    }),
);

app.use(cookieParser());

//import routers
import userRouter from './router/user.router.js';

app.use('/api/v1/users', currentRequest, userRouter);
export default app;
