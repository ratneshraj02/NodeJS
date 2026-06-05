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

//login user

// login user
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.send({
				auth: false,
				message: 'No user found. Register first.',
			});
		}

		const passIsValid = bcrypt.compareSync(req.body.password, user.password);

		if (!passIsValid) {
			return res.send({ auth: false, message: 'Invalid password' });
		}

		const token = await JsonWebToken.sign(
			{ id: user._id },
			process.env.JWT_TOKEN,
			{ expiresIn: 86400 }, // 24 hours
		);

		return res.send({ auth: true, token });
	} catch (err) {
		return res
			.status(500)
			.send({ auth: false, message: 'Server error', error: err.message });
	}
});

export default router;
