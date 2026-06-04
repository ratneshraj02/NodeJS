import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DB_NAME } from '../constant.js';
dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const dbName = DB_NAME;

const connectDB = async () => {
	try {
		if (!mongoUrl) {
			throw new Error('MongoDB url not found');
		}

		await mongoose.connect(`${mongoUrl}/${dbName}`);
		console.log('MongoDB Connected');
	} catch (err) {
		console.log('MongoDB connection failed', err.message);
	}
};

export default connectDB;