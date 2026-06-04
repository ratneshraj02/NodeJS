import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// const mongoUrl = process.env.MONGO_URL;
const mongoOnlineUrl = process.env.MONGO_ON_URL;
const dbName = process.env.MONGO_DB_NAME;

const mongoUrl = `${mongoOnlineUrl}/${dbName}`;

const client = new MongoClient(mongoUrl);


let collection;

async function dbConnection() {
  try {
    await client.connect();
    console.log("Database connected!");
    const db = client.db(dbName);
    collection = db.collection('dashboard');
  } catch (err) {
    console.log("Database connection failed!", err.message);
  }
}

export { collection, dbConnection };
