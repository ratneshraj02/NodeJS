import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateAccessToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: process.env.JWT_ACCESS_EXPIRE_IN || '15m',
	});
	return token;
};

const verifyAccessToken = (token) => {
	const isVerify = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

	return isVerify;
};

const generateRefreshToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.JWT_REFRESH_EXPIRE_IN || '7d',
	});

	return token;
};

const verifyRefreshToken = (token) => {
	const isVerify = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
	return isVerify;
};

const generateResetToken = (data) => {
	const rowToken = crypto.randomBytes(32).toString('hex');
	const hashedToken = crypto
		.createHash('sha256')
		.update(rawToken)
		.digest('hex');

	return { rowToken, hashedToken };
};

export {
	generateResetToken,
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
};
