import db from '../db/index.js';
import jwt from 'jsonwebtoken';
import { userTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'node:crypto';
import 'dotenv/config';


async function signupController(req, res) {
	console.log(process.env.JWT_SECRET);
	const { name, email, password } = req.body;
	const [existingUser] = await db
		.select({
			email: userTable.email,
		})
		.from(userTable)
		.where((table) => eq(table.email, email));

	if (existingUser) {
		res.status(400).json({ error: `user with email ${email} already exist` });
	}
	const salt = randomBytes(256).toString('hex');
	const hashPassword = createHmac('sha256', salt)
		.update(password)
		.digest('hex');

	const [user] = await db
		.insert(userTable)
		.values({
			name,
			email,
			password: hashPassword,
			salt,
		})
		.returning({ id: userTable.id });

	return res
		.status(201)
		.json({ status: 'success', data: { userId: user.id} });
}

async function loginController(req, res) {
	const { email, password } = req.body;

	const [existingUser] = await db
		.select({
			id: userTable.id,
			email: userTable.email,
			salt: userTable.salt,
			password: userTable.password,
		})
		.from(userTable)
		.where((table) => eq(table.email, email));

	if (!existingUser) {
		res.status(404).json({ error: `user with email ${email} doesn't exist` });
	}

	const salt = existingUser.salt;
	const existingHash = existingUser.password;

	const newHash = createHmac('sha256', salt).update(password).digest('hex');

	if (newHash != existingHash) {
		res.status(400).json({ error: 'incorrect password' });
	}

	const payload = {
		id: existingUser.id,
		name: existingUser.name,
		email: existingUser.email,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET);
	console.log(token);

	return res.json({ status: 'success', token: token });
}

async function updateController(req, res) {
	const user = req.user;

	if (!user) {
		res.status(401).json({ error: 'You are not logged in' });
	}

	const { name } = req.body;
	await db.update(userTable, set({ name })).where(eq(userTable.id, user.id));

	return res.status(201).json({ status: 'success' });
}

async function isLoginController(req, res) {
	const user = req.user;

	if (!user) {
		res.status(401).json({ error: 'You are not logged in' });
	}

	return res.json({ user });
}

export {
	loginController,
	signupController,
	updateController,
	isLoginController,
};
