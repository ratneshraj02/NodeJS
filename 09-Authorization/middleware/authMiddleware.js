import express from 'express';
import jwt from 'jsonwebtoken';

async function authenticationMiddleware(req, res, next) {
	try {
		const tokenHeader = req.headers['authorization'];

		if (!tokenHeader) {
			return next();
		}

		if (!tokenHeader.startWith('Bearer')) {
			return res
				.status(400)
				.json({ error: 'authorization header must start with Bearer' });
		}

		const token = tokenHeader.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded;
		next();
	} catch (err) {
		next();
	}
}

async function ensureAuthenticated(req, res, next) {
	if (!req.user) {
		return res.status(401).json({ error: 'You must be authenticated' });
	}

	next();
}

function restrictToRole(role) {
	return function (req, res, next) {
		if (req.user.role != role) {
			res
				.status(401)
				.json({ error: 'you are not authorized to access the resource' });
		}
		return next();
	};
}

export { authenticationMiddleware, ensureAuthenticated, restrictToRole };
