import db from '../db/index.js';
import { userTable } from '../models/userModel.js';
import { randomBytes, createHmac } from 'node:crypto';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

async function signController(req, res) {
	const { name, email, password } = req.body;

	const [existingUser] = await db
		.select({ email: userTable.email })
		.from(userTable)
		.where((table) => eq(table.email, email));

	if (existingUser) {
		res.status(400).json({ error: 'User already exist, Login' });
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

	return res.status(201).json({ status: 'success', id: userTable.id });
}

async function loginController(req, res) {
	const { email, password } = req.body;

	const [existingUser] = await db
		.select({
			id: userTable.id,
			email: userTable.email,
			name: userTable.name,
			salt: userTable.salt,
			role : userTable.role,
			password: userTable.password,
		})
		.from(userTable)
		.where((table) => eq(table.email, email));

	if (!existingUser) {
		res.status(404).json({ error: "user and email don't exist" });
	}

	const salt = existingUser.salt;
	const existingHash = existingUser.password;

	const newHash = createHmac('sha256', salt).update(password).digest('hex');

	if (newHash != existingHash) {
		res.status(400).json({ error: 'password in incorrect' });
	}

	const payload = {
		id: existingUser.id,
		name: existingUser.name,
		email: existingUser.email,
		role : existingUser.role,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET);

	return res.status(201).json({ status: "success", token: token });
}

async function isLoginController(req, res) {
	res.status(201).json({ user: user });
}

export { signController, loginController, isLoginController };
