import express from 'express';
import jwt from 'jsonwebtoken';

async function tokenMiddleware(req, res, next) {
	try {
		const tokenHeader = req.headers['authorization'];

		if (!tokenHeader) {
			res
				.status(400)
				.json({ error: 'authorization header must start with Bearer' });
		}

		const token = tokenHeader.split(' ')[1];

		const decode = jwt.verify(token, process.env.JWT_SECRET);

		res.use = decode;
		next();
	} catch (err) {
		next();
	}
}

export { tokenMiddleware };
