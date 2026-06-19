import { pgTable, uuid, varchar, pgEnum, text } from 'drizzle-orm/pg-core';
import { createHash } from 'node:crypto';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

const userTable = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	role: userRoleEnum().default('USER').notNull(),
	salt: text().notNull(),
});

export { userTable };
