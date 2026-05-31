import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);
const dbName = "ToDo";

let collection;

async function dbConnection() {
  try {
    await client.connect();
    console.log("Database connected!");
    const db = client.db(dbName);
    collection = db.collection('dashboard');
  } catch (err) {
    console.log("Database connection failed!");
  }
}

export { collection, dbConnection };
