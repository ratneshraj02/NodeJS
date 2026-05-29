import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

const client = new MongoClient(mongoUrl);
const dbName = 'zomatoapi';

let db;

async function connectDB() {
	try {
        await client.connect()
            .then(client => {
                db = client.db(dbName);
                console.log('Connected successfully to server');
            });
	} catch (err) {
		console.log('Database Error : ', err.message);
	}
}


export { connectDB, db };
