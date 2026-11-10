import { pgTable, varchar, text, uuid, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import authorTable from './author.model.js';

const booksTable = pgTable(
	'books',
	{
		id: uuid().primaryKey().defaultRandom(),
		title: varchar({ length: 100 }).notNull(),
		description: text(),
		authorId: uuid().references(() => authorTable.id),
	},
	(table) => ({
		searchIndexOnTitle: index("title_index").using(
			'gin',
			sql`to_tsvector('english', ${table.title})`,
		),
	}),
);

export default booksTable;
