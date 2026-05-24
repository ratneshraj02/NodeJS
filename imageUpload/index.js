import express from 'express';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB, getDB } from './db/db.js';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/profile', (req, res) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No file was uploaded');
		}

		const imageDir = path.join(__dirname, 'public/images');

		const imagePath = req.files.imagePath;

		const uploadPath = path.join(imageDir, imagePath.name);

		imagePath.mv(uploadPath, async (err) => {
			if (err) return res.status(500).send(err);

			const image = {
				imageTitle: req.body.imageName,
				imagePath: imagePath.name,
			};

            //DB Connection
            const db = getDB();

            await db.collection('images').insertOne(image);
            
			return res.render('display', { image });
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
});

app.get('/images', async (req, res) => {
    try {
        
        const db = getDB();

        const result = await db.collection('images').find({}).toArray();
        
		res.render('imageAll', {images : result});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.listen(port, () => {
	connectDB();
	console.log(`server is listening: ${port}`);
});
