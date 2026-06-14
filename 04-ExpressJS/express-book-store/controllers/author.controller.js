import { booksTable, authorTable } from '../models/index.js';
import { sql } from 'drizzle-orm';
import { eq, ilike } from 'drizzle-orm';
import db from '../db/index.js';

async function getAllAuthor(req, res) {
	const authors = await db.select().from(authorTable);
	res.json(authors);
}

async function getAuthorById(req, res) {
	const id = req.params.id;

	const author = await db
		.select()
		.from(authorTable)
		.where(eq(authorTable.id, id))
		.limit(1);

	if (!author)
		return res.status(404).json({ error: `Author ${id} doesn't found` });
	res.json(author);
}

async function createAuthor(req, res) {

    const { firstName, lastName, email } = req.body;

	if (!firstName) {
		res.status(404).send({ error: 'first name is required' });
	}

	if (!email) {
		res.status(404).send({ error: 'email is required' });
	}

	const author = { firstName, lastName, email };

	const [result] = await db
		.insert(authorTable)
		.values(author)
		.returning({ id: authorTable.id });

	res.status(210).json({ message: `Author created success`, id: result.id });
}

async function deleteAuthor(req, res) {
	const id = req.params.id;
	const result = await db.delete(authorTable).where(eq(authorTable.id, id));
	res.status(200).json({ message: `book deleted` });
}

async function bookByAuthor(req, res) {
    const id = req.params.id;
    console.log(id);
    const books = await db.select().from(booksTable).where(eq(booksTable.authorId, id));
    res.json(books);
}

export { getAllAuthor, getAuthorById, createAuthor, deleteAuthor, bookByAuthor };
