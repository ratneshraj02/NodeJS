import { pgTable, uuid, varchar, pgEnum, text } from 'drizzle-orm/pg-core';
import { createHash } from 'node:crypto';

const roleEnum = pgEnum('role', ['user', 'admin']);

const userTable = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	salt: text().notNull(),
	role: roleEnum('role').default('user').notNull(),
});

export { userTable };
