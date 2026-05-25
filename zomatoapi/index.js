import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

let mongoUrl = process.env.MONGO_URL;
let port = process.env.PORT;
let app = express();

let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { 
    res.status(200).send("Health OK");
});



const client =  new MongoClient(mongoUrl);
const dbName = 'aprnode';

async function connectDB() {
    try { 

        await client.connect();
        console.log('Connected successfully to server');
        db = client.db(dbName);
    } catch (err) {
        console.log("Database Error : ",err.message);
    }
}

app.listen(port, () => { 
    connectDB();
    console.log("Server is listening :", port);
});