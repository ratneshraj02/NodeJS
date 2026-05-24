import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config();

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

let db;


const dbName = 'ImageDB';

async function connectDB() {
    
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.log("Can't connect DB", err.message);
    }
}

function getDB() {
    return db;
}


export { connectDB, getDB };

