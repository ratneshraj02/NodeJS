import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './modules/auth/auth.router.js';
import ApiError from './common/utils/api-error.js';
import ownerRoute from './modules/ipl-ms/routes/owner.route.js';
import teamRoute from './modules/ipl-ms/routes/team.route.js';
import playerRoute from './modules/ipl-ms/routes/player.route.js';
import sponsorRoute from './modules/ipl-ms/routes/sponsor.route.js';
import broadcasterRoute from './modules/ipl-ms/routes/broadcaster.route.js';
import teamSponsorRoute from './modules/ipl-ms/routes/team-sponsor.route.js';
import teamBroadcasterRoute from './modules/ipl-ms/routes/team-broadcaster.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/owners', ownerRoute);
app.use('/api/teams', teamRoute);
app.use('/api/players', playerRoute);
app.use('/api/sponsors', sponsorRoute);
app.use('/api/broadcasters', broadcasterRoute);
app.use('/api/team-sponsors', teamSponsorRoute);
app.use('/api/team-broadcasters', teamBroadcasterRoute);

//Catch-all undefined route
app.use((req, res) => {
    throw ApiError.notfound(`Route ${req.originalUrl} not found`);
})

//Global error handler - must be registered after all routes
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    if (statusCode >= 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message: err.isOperation ? err.message : 'Internal server error',
    });
});

export default app;
