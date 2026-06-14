import { booksTable, authorTable } from '../models/index.js';
import db from '../db/index.js';
import { sql } from 'drizzle-orm';
import { eq, ilike } from 'drizzle-orm';

export async function getAllBook(req, res) {
	const search = req.query.search;

	if (search) {
		const book = await db
			.select()
			.from(booksTable)
			.where(
				sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`,
			);
		res.json(book);
	}

	const books = await db.select().from(booksTable);
	res.json(books);
}

export async function getBookById(req, res) {
	const id = req.params.id;

	const book = await db
		.select()
		.from(booksTable)
		.where((table) => eq(table.id, id))
		.leftJoin(authorTable,eq(booksTable.authorId, authorTable.id))
		.limit(1);

	if (!book) return res.status(404).send({ error: `Book ${id} doesn't found` });

	res.json(book);
}

export async function createBook(req, res) {
	const { title, description, authorId } = req.body;

	if (!title || title === '') {
		return res.status(400).json({ error: 'title is required' });
	}

	const book = { title, description, authorId };

	const [result] = await db
		.insert(booksTable)
		.values(book)
		.returning({ id: booksTable.id });
	return res
		.status(201)
		.json({ message: `Book created success`, id: result.id });
}

export async function deleteBookById(req, res) {
	const id = req.params.id;

	const result = await db.delete(booksTable).where(eq(booksTable.id, id));
	res.status(200).json({ message: `book deleted` });
}
