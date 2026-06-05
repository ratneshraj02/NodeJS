import express, { Router } from 'express';
import bodyParser from 'body-parser';
import JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import User from '../models/userSchema.js';

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// get all user
router.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

//register user
router.post('/register', async (req, res) => {
	try {
		//encrypt the password
		const hashPassword = bcrypt.hashSync(req.body.password, 8);

		let response = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: hashPassword,
			phone: req.body.phone,
			role: req.body.role ? req.body.role : 'User',
		});

		res.status(200).send('Registration Successfully');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});


export default router;
