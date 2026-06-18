import { pgTable, varchar, text, uuid,  } from 'drizzle-orm/pg-core';
import { createHash } from 'node:crypto';

const userTable = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: text().notNull(),
});

export { userTable };
