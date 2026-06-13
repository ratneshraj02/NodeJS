
import dotenv from 'dotenv';
import { db } from './db/index.js';
import { userTable } from './drizzle/schema.js';

dotenv.config();

async function getAllUsers() {
	const users = await db.select().from(userTable);
	console.log('Users Table :', users);
	return users;
}

async function createUser({ id, name, email }) {
	await db.insert(userTable).values({
		id,
		name,
		email,
	});
}

// createUser({ id: 1, name: ' Ratnesh', email: 'ratnesh@gmail.com' });
// createUser({ id: 2, name: 'Raju', email: 'raju@gmail.com' });

getAllUsers();
