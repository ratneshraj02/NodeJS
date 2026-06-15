import express from 'express';
import db from '../db/index.js';
import { usersTable, userSessions } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'node:crypto';

const router = express.Router();

router.patch('/', async function (req, res) {
    const user = req.user;

    if (!user) {
        res.status(401).json({ error: 'You are not logged in' });
    }

    const { name } = req.body;
    await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id));

    return res.status(201).json({status : "success"});
});

router.get('/', async function (req, res) {

    const user = req.user;

	if (!user) {
		res.status(401).json({ error: 'You are not logged in' });
	}
    
	return res.json({ user  });
});

router.post('/signup', async function (req, res) {
	const { name, email, password } = req.body;

	const [existingUser] = await db
		.select({
			email: usersTable.email,
		})
		.from(usersTable)
		.where((table) => eq(table.email, email));

	if (existingUser) {
		res.status(400).json({ error: `user with email ${email} already exist` });
	}

	const salt = randomBytes(256).toString('hex');
	const hashPassword = createHmac('sha256', salt)
		.update(password)
		.digest('hex');

	const [user] = await db
		.insert(usersTable)
		.values({
			name,
			email,
			password: hashPassword,
			salt,
		})
		.returning({ id: usersTable.id });

	return res.status(201).json({ status: 'success', data: { userId: user.id } });
});
router.post('/login', async function (req, res) {
	const { email, password } = req.body;

	const [existingUser] = await db
		.select({
			id: usersTable.id,
			email: usersTable.email,
			salt: usersTable.salt,
			password: usersTable.password,
		})
		.from(usersTable)
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

	const [session] = await db
		.insert(userSessions)
		.values({
			userId: existingUser.id,
		})
		.returning({ id: userSessions.id });
	return res.json({ status: 'success', sessionId: session.id });
});

export default router;
