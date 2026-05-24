import express from 'express';
import ejs from 'ejs';
import dotenv from 'dotenv';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 7000;

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page
app.get('/', (req, res) => {
	res.render('index');
});

// Upload route
app.post('/profile', (req, res) => {
	const form = formidable({ multiples: false });

	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(500).send(err.message);
		}
        
        const file = files.fileName[0];
		// old temp path
		const oldPath = file.filepath;

		// new file path
		const newPath = path.join(
			__dirname,
			'public',
			'images',
			file.originalFilename,
        );
        
		// move file
		fs.rename(oldPath, newPath, (err) => {
			if (err) {
				return res.status(500).send(err.message);
			}

			res.send('File Uploaded Successfully');
		});
	});
});

// Server
app.listen(port, () => {
	console.log('Server is listening :', port);
});
