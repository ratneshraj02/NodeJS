import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import ejs from 'ejs';
import { configDotenv } from 'dotenv';
import mongodb from 'mongodb';
import { collection, dbConnection } from './db/db.js';
import packageJson from './package.json' with { type: 'json' };

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//health check
app.get('/health', (req, res) => {
	res.send('Health OK!');
});

//add user
app.post('/addUser', async (req, res) => {
	const data = req.body;
	await collection.insertOne(data);
	res.send('Added User');
});

//get user
app.get('/users', async (req, res) => {
	const output = [];
	let query = {};
	if (req.query.city && req.query.role) {
		query = {
			role: req.query.role,
			city: req.query.city,
			isActive: true,
		};
	} else if (req.query.city && req.query.isActive) {
		query = {
			city: req.query.city,
			isActive: true,
		};
	} else if (req.query.role) {
		query = {
			role: req.query.role,
			isActive: true,
		};
	} else if (req.query.isActive) {
		let isActive = req.query.isActive;

		if (isActive === 'false') {
			isActive = false;
		} else {
			isActive = true;
		}
		query = { isActive: isActive };
	}

	const data = collection.find(query);
	for await (const doc of data) {
		output.push(doc);
	}
	await data.close();
	res.send(output);
});

//get particular user
app.get('/user/:id', async (req, res) => {
	let _id = new mongodb.ObjectId(req.params.id);
	let query = { _id: _id };

	const output = await collection.findOne(query);
	res.send(output);
});

//update user
app.put('/updateUser', async (req, res) => {
	let id = req.params.id;
	const _id = new mongodb.ObjectId(id);

	const query = { _id: _id };

	const data = {
		name: req.body.name,
		city: req.body.city,
		phone: req.body.phone,
		role: req.body.role,
		isActive: true,
  };
  
  await collection.updateOne(query, data);
  res.send("records Updated");
});

/* Delete User */
app.delete('/deleteUser', async (req, res) => {
  
  await collection.deleteOne({
    _id: new mongodb.ObjectId(req.body._id)
  });

  res.send("User deleted");
});

app.listen(port, () => {
	dbConnection();
	console.log(`Sever is listening port :${port} `);
});
