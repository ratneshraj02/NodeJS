import express from 'express';
import fs from 'fs';

const app = express();
const port = 8000;

//middleware (plugins)
app.use(express.json());

//middleware to logs
app.use(function (req, res, next) {
	const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
	fs.appendFileSync('logs.txt', log, 'utf-8');
	next();
});

//In memory DB
const books = [
	{ id: 1, title: 'book one', author: 'Author one' },
	{ id: 2, title: 'book two', author: 'Author Two' },
	{ id: 3, title: 'book three', author: 'Author Three' },
	{ id: 4, title: 'book four', author: 'Author four' },
	{ id: 5, title: 'book five', author: 'Author five' },
];

//Routes
app.get('/books', (req, res) => {
	res.json(books);
});

app.get('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.status(400).json({ error: `Id must be types number` });
	}
	const book = books.find((ele) => ele.id === id);

	console.log(book);
	if (!book) return res.status(404).send({ error: `Book ${id} doesn't found` });

	res.send(book);
});

app.post('/books', (req, res) => {
	const { title, author } = req.body;

	if (!title || title === '') {
		return res.status(400).json({ error: 'title is required' });
	}

	if (!author || author === '') {
		return res.status(400).json({ error: 'author is required' });
	}

	const id = books.length + 1;

	const book = { id: id, title: title, author: author };

	books.push(book);
	return res.status(201).json({ message: `Book created success :${id}` });
});

app.delete('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.status(400).json({ error: `Id must be types number` });
	}

	if (id < 0) {
		return res.status(400).json({ error: `Book with ${id} doesn't exist` });
	}
	books.splice(id, 1);
	res.status(200).json({ message: 'book deleted' });
});

app.listen(port, () => {
	console.log(`Sever is listening :${port}`);
});
