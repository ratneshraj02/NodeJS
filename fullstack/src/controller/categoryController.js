let express = require('express');

let categoryRouter = express.Router();

const { MongoClient } = require('mongodb');

let url = process.env.MONGO_URL;

let client = new MongoClient(url);

const dbName = 'aprnode';

function router(menu) {
	categoryRouter.route('/').get(async (req, res) => {
		try {
			await client.connect();
			console.log('Connected successfully to server');

			const db = client.db(dbName);

			// FIXED: removed extra spaces
			const collection = db.collection('category');

			const result = await collection.find({}).toArray();

            
			res.render('category', {
				title: 'Category Page',

				// FIXED: use result instead of undefined category
				category: result,

				menu,
			});
		} catch (err) {
			console.log(err);

			res.status(500).send('Database Error');
		}
	});

	categoryRouter.route('/details').get((req, res) => {
		res.send('Category Details');
	});

	return categoryRouter;
}

module.exports = router;
