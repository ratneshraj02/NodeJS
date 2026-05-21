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
				title: 'Product Page',
				product: result,
				menu,
			});
		} catch (err) {
			console.log(err);

			res.status(500).send('Database Error');
		}
	});

	productRouter.route('/category/:id').get(async (req, res) => {
		let { id } = req.params;
		// it always in form the string

		await client.connect();
		console.log('Connected successfully to server');

		const db = client.db(dbName);

		const collection = db.collection('product');

		const result = await collection
			.find({ category_id: `CAT00${Number(id)}` })
			.toArray();

		console.log(result);
		res.render('product', {
			title: 'Product Page',
			product: result,
			menu,
		});
	});

	productRouter.route('/details').get((req, res) => {
		res.send('Product Details');
	});

	return productRouter;
}

module.exports = router;
