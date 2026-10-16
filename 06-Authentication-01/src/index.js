import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config({
    path: './.env',
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`sever is running on port: ${process.env.PORT}`);
        });

        app.on('error', () => {
            console.log(`ERROR : ${error}`);
            throw error;
        });
    })
    .catch((error) => {
        console.log(`MongoDB connection failed : ${error}`);
    });
