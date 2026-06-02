import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };
import mongodb from 'mongodb';
import ejs from 'ejs';
import { configDotenv } from 'dotenv';
import packageJson from './package.json' with { type: 'json' };
import { collection, dbConnection } from './db/db.js';
import {
	addUser,
	deleteUser,
	getData,
	getOneUser,
	updateUser,
} from './controller/apiController.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//health check
app.get('/health', (req, res) => {
	res.send('Health OK!');
});

//add user
app.post('/addUser', async (req, res) => {
	await addUser(req.body);
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

		if (isActive == 'false') {
			isActive = false;
		} else {
			isActive = true;
		}
		query = { isActive: isActive };
	}

	const data = getData(query);
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

	const output = await getOneUser(query);
	res.send(output);
});

//update user
app.put('/updateUser', async (req, res) => {
	const _id = new mongodb.ObjectId(req.body.id);

	const query = { _id: _id };

	await updateUser(query, {
		$set: {
			name: req.body.name,
			city: req.body.city,
			phone: req.body.phone,
			isActive: true,
		},
	});
	res.send('records Updated');
});

/* Delete User */
app.delete('/deleteUser', async (req, res) => {
	const _id = new mongodb.ObjectId(req.body.id);
	let query = {
		_id: _id,
	};

	await deleteUser(query);
	res.send('User deleted');
});

/* soft delete */
app.put('/deactivateUser', async (req, res) => {
	const _id = new mongodb.ObjectId(req.body._id);

	const query = { _id: _id };

	await updateUser(query, {
		$set: {
			isActive: false,
		},
	});
	res.send('user deactivate User');
});

app.put('/activateUser', async (req, res) => {
	const _id = new mongodb.ObjectId(req.body._id);

	await updateUser(
		{ _id: _id },
		{
			$set: {
				isActive: true,
			},
		},
	);
	res.send('user activated User');
});

app.listen(port, () => {
	dbConnection();
	console.log(`Sever is listening port :${port} `);
});
