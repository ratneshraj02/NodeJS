import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongodb from 'mongodb';
import {
	getData,
	getDataWithSort,
	getDataWithSortLimit,
} from './controller/apiController.js';
import { connectDB } from './db/db.js';

dotenv.config();

let mongoUrl = process.env.MONGO_URL;
let port = process.env.PORT;
let authKey = process.env.AuthKey;
let app = express();

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

// get heart beat
app.get('/', (req, res) => {
	res.status(200).send('Health OK');
});

//list of city
app.get('/location', async (req, res) => {
	let key = req.header('x-basic-token');
	let collName = 'location';
	let query = {};

	if (auth(key)) {
		const data = await getData(collName, query);
		res.status(200).send(data);
	} else {
		res.status(401).send('Not Authenticated call');
	}
});

//list of restaurant
app.get('/restaurant', async (req, res) => {
	let collectionName = 'restaurants';
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

	const data = await getData(collectionName, query);
	res.status(200).send(data);
});

// list of meal
app.get('/meals', async (req, res) => {
	let query = {};
	let collName = 'mealType';
	const data = await getData(collName, query);
	res.send(data);
});

//filters
app.get('/filter/:mealId', async (req, res) => {
	let collName = 'restaurants';
	let mealId = Number(req.params.mealId);
	let cuisineId = Number(req.query.cuisineId);

	let hCost = Number(req.query.hCost);
	let lCost = Number(req.query.lCost);

	let sort = { cost: 1 };
	let skip = 0;
	let limit = 10000000;

	if (req.query.skip && req.query.limit) {
		skip = Number(req.query.skip);
		limit = Number(req.query.limit);
	}
	if (req.query.sort) {
		sort = { cost: req.query.sort };
	}
	if ((hCost && lCost, cuisineId)) {
		const query = {
			$and: [
				{ 'mealTypes.mealtype_id': mealId },
				{ 'cuisines.cuisine_id': cuisineId },
				{
					cost: {
						$gt: lCost,
						$lt: hCost,
					},
				},
			],
		};
	} else if (cuisineId) {
		query = {
			'mealTypes.mealtype_id': mealId,
			'cuisines.cuisine_id': cuisineId,
		};
	} else if (hCost && lCost) {
		const query = {
			$and: [
				{ 'mealTypes.mealtype_id': mealId },
				{
					cost: {
						$gt: lCost,
						$lt: hCost,
					},
				},
			],
		};
	}
	let query = {};
	const data = await getDataWithSortLimit(collName, query, sort, skip, limit);
	res.send(data);
});

//details
app.get('/details/:id', async (req, res) => {
	let _id = new mongodb.ObjectId(req.params.id);
	let collectionName = 'restaurants';
	let query = { _id };

	let data = await getData(collectionName, query);
	res.send(data);
});

//menu wrt restaurant
app.get('/menu/:id', async (req, res) => {
	let id = Number(req.params.id);
	let collName = 'menu';
	let query = {};

	const data = await getData(collName, query);
	res.status(200).send(data);
});

//order
app.get('/orders', async (req, res) => {
	let collName = 'orders';
	let query = {};

	if (req.query.email) {
		query = {email :req.query.email};
	}

	const data = await getData(collName, query);
	res.send(data);
 }); 

app.listen(port, () => {
	connectDB();
	console.log('Server is listening :', port);
});
