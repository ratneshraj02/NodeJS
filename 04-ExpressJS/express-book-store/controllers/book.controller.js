import authorTable from '../models/author.model';
import booksTable from '../models/book.model';

import db from '../db/index';

export function getAllBook(req, res) {
	res.send(BOOKS);
}

export function getBookById(req, res) {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.status(400).json({ error: `id must be types number` });
	}
	const book = BOOKS.find((ele) => ele.id === id);

	if (!book) return res.status(404).send({ error: `Book ${id} doesn't found` });

	res.send(book);
}

export function createBook(req, res) {
	const { title, author } = req.body;

	if (!title || title === '') {
		return res.status(400).json({ error: 'title is required' });
	}

	if (!author || author === '') {
		return res.status(400).json({ error: 'author is required' });
	}

	const id = BOOKS.length + 1;
	console.log(id);

	const book = { id, title, author };

	BOOKS.push(book);
	return res.status(201).json({ message: `Book created success :${id}` });
}

export function deleteBookById(req, res) {
	const id = parseInt(req.params.id);
	console.log(id);

	if (isNaN(id)) {
		res.status(400).json({ error: `id must be types number` });
	}

	if (id < 0) {
		return res.status(400).json({ error: `Book with ${id} doesn't exist` });
	}
	BOOKS.splice(id, 1);
	res.status(200).json({ message: 'book deleted' });
}
