import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

let mongoUrl = process.env.MONGO_URL;
let port = process.env.PORT;
let authKey = process.env.AuthKey;
let app = express();

let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function auth(key) {
	if (key == authKey) {
		return true;
	} else {
		return false;
	}
}
 function getData(colName, query) {
	if (colName && query) {
		const data =  db.collection(colName).find(query).toArray();
		return data;
	} else {
		return 'Data Missing';
	}
}

// get heart beat
app.get('/', (req, res) => {
	res.status(200).send('Health OK');
});

//list of city
app.get('/location', async (req, res) => {
	let key = req.header('x-basic-token');
	if (auth(key)) {
		const data = await db.collection('location').find({}).toArray();
		res.send(data);
	} else {
		res.status(401).send('Not Authenticated call');
	}
});

//list of restaurant
app.get('/restaurant', async (req, res) => {
	let query = {};
	let stateId = Number(req.query.stateId);
	let mealId = Number(req.query.mealId);

	if (stateId && mealId) {
		query = {
			state_id: stateId,
			'mealTypes.mealtype_id': mealId,
		};
	} else if (stateId) {
		query = { state_id: stateId };
	} else if (mealId) {
		query = { 'mealTypes.mealtype_id': mealId };
	} else {
		query = {};
	}

	const data = await db.collection('restaurants').find(query).toArray();
	res.status(200).send(data);
});

// list of meal
app.get('/meals', async (req, res) => {
	let query = {};
	let collection = 'mealType';
	const data = await getData(collection, query);
	if (data) {
		res.status(200).send(data);
	} else {
		res.send(data);
	}
});

const client = new MongoClient(mongoUrl);
const dbName = 'zomatoapi';

async function connectDB() {
	try {
		await client.connect();
		console.log('Connected successfully to server');
		db = client.db(dbName);
	} catch (err) {
		console.log('Database Error : ', err.message);
	}
}

app.listen(port, () => {
	connectDB();
	console.log('Server is listening :', port);
});
