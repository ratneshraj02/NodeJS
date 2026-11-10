import User from './auth.model.js';
import crypto from 'crypto';
import ApiError from '../../common/utils/api-error.js';
import {
	generateResetToken,
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from '../../common/utils/jwt.utils.js';
import {
	sendVerificationEmail,
	sendResetPasswordEmail,
} from '../../common/config/email.js';

//Hash refresh token before saving - same approach as reset tokens
function hashedToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex');
}

const register = async ({ name, email, password, role }) => {
	const existing = await User.findOne({ email });

	if (existing) {
		throw ApiError.conflict('Email already registered');
	}

	const { rawToken, hashedToken } = generateResetToken;

	const user = User.create({
		name,
		email,
		password,
		role,
		verificationToken: hashedToken,
	});

	//Don't let email failure crash registration - user already created
	try {
		await sendVerificationEmail(email, rawToken);
	} catch (error) {
		console.error('Failed to send verification email:', error.message);
	}

	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.verificationToken;

	return userObj;
};

const login = async ({ email, password }) => {
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw ApiError.unauthorized('Invalid email and password');
	}

	//somehow to change the password
	const isMatch = await user.comparePassword(password);
	if (!isMatch) throw ApiError.unauthorized('Invalid email or Password');

	if (!user.isVerified) {
		throw ApiError.forbidden('Please verify your email before logging in');
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

// Issues a new access token using  a valid refresh token
const refresh = async (token) => {
	if (!token) {
		ApiError.unauthorized('Refresh token missing');
	}

	const decoded = verifyRefreshToken(token);

	const user = await User.findById(decoded.id).select('+refreshToken');

	if (!user) {
		throw ApiError.unauthorized('User no longer exist');
	}

	//Verify the refresh token matches what's stored (prevents reuse of old tokens)
	if (user.refreshToken !== hashedToken(token)) {
		throw ApiError.unauthorized('Invalid refresh token - please log in');
	}

	const accessToken = generateAccessToken({ id: user._id, role: user.role });

	await user.save({ validateBeforeSave: false });

	return { accessToken };
};

const logout = async (userId) => {
	await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async (email) => {
	const user = User.findOne({ email });

	if (!user) {
		throw ApiError.notfound('No account with that email');
	}

	const { rawToken, hashedToken } = generateResetToken();

	user.resetPasswordToken = hashedToken;
	user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
	await user.save({ validateBeforeSave: false });

	try {
		await sendResetPasswordEmail(email, rawToken);
	} catch (error) {
		console.error('Failed to send reset email', error.message);
	}
};

const resetPassword = async (token, newPassword) => {
	const hashToken = hashedToken(token);

	const user = await User.findOne({
		resetPasswordExpires: hashToken,
		resetPasswordExpires: { $gt: Date.now() },
	}).select('+resetPasswordToken +resetPasswordExpires');

	if (!user) {
		throw ApiError('Invalid or expired reset token');
	}

	if (!newPassword) {
		throw ApiError('Password not found');
	}

	user.password = newPassword;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	await user.save();
};

const verifyEmail = async (token) => {
	const trimmed = String(token).trim();

	if (!trimmed) {
		throw ApiError.bedRequest('Invalid or expired verification token');
	}

	const hashInput = hashedToken(trimmed);
	const user = await User.findOne({ verificationToken: hashInput }).select(
		'+verificationToken',
	);

	if (!user) {
		throw ApiError.notfound('Invalid or expired verification token');
	}

	await User.findByIdAndUpdate(user._id, {
		$set: { isVerified: true },
		$unset: { verificationToken: 1 },
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
