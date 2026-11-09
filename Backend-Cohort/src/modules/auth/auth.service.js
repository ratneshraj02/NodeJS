import User from './auth.model.js';
import crypto from 'crypto';
import ApiError from '../../common/utils/api-error.js';
import {
	generateResetToken,
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from '../../common/utils/jwt.utils.js';
import { sendMail, sendVerificationEmail } from '../../common/config/email.js';

function hashedToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex');
}

const register = async ({ name, email, password, role }) => {
	const existing = await User.findOne({ email });

	if (existing) {
		throw ApiError.conflict('Email already exist');
	}

	const { rawToken, hashedToken } = generateResetToken;

	const user = User.create({
		name,
		email,
		password,
		role,
		verificationToken: hashedToken,
	});

	try {
		await sendVerificationEmail(email, token);
	} catch (error) {
		console.error(error);
	}

	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.verificationToken;

	return userObj;
};

const login = async ({ email, password }) => {
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw ApiError.unauthorized('Email and Password in invalid');
	}

	//somehow to change the password
	const isMatch = await user.comparePassword(password);
	if (!isMatch) throw ApiError.unauthorized('Invalid email or Password');

	if (!user.verify) {
		throw ApiError.forbidden('Verify you email before login');
	}

	const accessToken = generateAccessToken({
		id: user._id,
		role: user.role,
	});
	const refreshToken = generateRefreshToken({
		id: user._id,
	});

	user.refreshToken = hashedToken(refreshToken);

	await user.save({ validateBeforeSave: false });

	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.refreshToken;

	return { user: userObj, accessToken, refreshToken };
};

const refresh = async ({ token }) => {
	if (!token) {
		ApiError.unauthorized('Refresh token missing');
	}

	const decoded = verifyRefreshToken(token);

	const user = await User.findById(decoded.id).select('+refreshToken');

	if (!user) {
		throw ApiError.unauthorized('User not found');
	}

	if (user.refreshToken != hashedToken(token)) {
		throw ApiError.unauthorized('Invalid refresh token');
	}

	const accessToken = generateAccessToken({ id: user._id, role: user.role });
	const refreshToken = generateRefreshToken({ id: user._id });

	user.refreshToken = hashedToken(refreshToken);
	await user.save({ validateBeforeSave: false });

	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.refreshToken;

	return { user: userObj, accessToken, refreshToken };
};

const logout = async (userId) => {
	await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async ({ email }) => {
	const user = User.findOne({ email });

	if (!user) {
		throw ApiError.notfound('no account with that email');
	}

	const { rawToken, hashedToken } = generateResetToken(user._id);

	user.resetPasswordToken = hashedToken;
	user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
	await user.save({ validateBeforeSave: false });
	//TODO - mail to user rowToken
};

const resetPassword = async (token, newPassword) => {
	const user = await User.findById({ token });

	if (!user) {
		throw ApiError('User not found');
	}

	if (!newPassword) {
		throw ApiError('Password not found');
	}

	user.password = newPassword;
	return await user.save({ validateBeforeSave: false });
};

const verifyEmail = async (token) => {
	const hashToken = hashedToken(token);
	const user = await User.findOne({ verificationToken: hashToken }).select(
		'+verificationToken',
	);

	if (!user) {
		throw ApiError.notfound('User not found');
	}

	user.isVerified = true;
	user.verificationToken = undefined;
	await user.save({
		validateBeforeSave: false,
	});

	return user;
};

const getMe = async (userId) => {
	const user = await User.findById({ userId });

	if (!user) {
		throw ApiError.notfound('User not found ');
	}
	return user;
};

export {
	register,
	login,
	refresh,
	logout,
	forgotPassword,
	resetPassword,
	verifyEmail,
	getMe,
};
