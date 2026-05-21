let express = require('express');

let productRouter = express.Router();

const { MongoClient } = require('mongodb');

let url = process.env.MONGO_URL;

let client = new MongoClient(url);

const dbName = 'aprnode';

function router(menu) {
	productRouter.route('/').get(async (req, res) => {
		try {
			await client.connect();
			console.log('Connected successfully to server');

			const db = client.db(dbName);

			// FIXED: removed extra spaces
			const collection = db.collection('product');

			const result = await collection.find({}).toArray();

			console.log(result);

			res.render('product', {
				title: 'Category Page',

				menu,
			});
		} catch (err) {
			console.log(err);

			res.status(500).send('Database Error');
		}
	});

	productRouter.route('/details').get((req, res) => {
		res.send('Category Details');
	});

	return productRouter;
}

module.exports = router;
