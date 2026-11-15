import * as authService from './auth.service.js';
import ApiResponse from '../../common/utils/api-response.js';
import ApiError from '../../common/utils/api-error.js';
import cookieParser from 'cookie-parser';


const register = async (req, res) => {
	const user = await authService.register(req.body);
	ApiResponse.created(
		res,
		'Register Successfully, please verify your email',
		user,
	);
};

const login = async (req, res) => {
	const { user, accessToken, refreshToken } = await authService.login(req.body);

	//refresh token goes in httpOnly cookie - not accessible to JS
	const options = {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000, //7 Day
	};

	res
		.cookie('refreshToken', refreshToken, options)
		.cookie('accessToken', accessToken, options);


	return ApiResponse.ok(res, 'Login successfully', { user, accessToken });
};

const refresh = async (req, res) => {
	const token = req.cookies?.refreshToken;
	const { accessToken } = await authService.refresh(token);
	ApiResponse.ok(res, 'Token refreshed', { accessToken });
};

const logout = async (req, res) => {
	await authService.logout(req.user.id);
	res.clearCookie('refreshToken');
	res.clearCookie('accessToken');
	ApiResponse.ok(res, 'Logout Successfully');
};

const verifyEmail = async (req, res) => {
	const user = authService.verifyEmail(res.params.token);
	ApiResponse.ok(res, 'Email verify successfully', user);
};

const forgotPassword = async (req, res) => {
	await authService.forgotPassword(req.params.email);
	ApiResponse.ok(res, 'Password reset email send');
};

const resetPassword = async (req, res) => {
	await authService.resetPassword(req.params.token, req.body.password);
	ApiResponse.ok(res, 'Token refreshed', { accessToken });
};

const getMe = async (req, res) => {
	const user = await authService.getMe(req.user.id);
	ApiResponse.ok(res, 'User Profile', user);
};

const uploadAvatar = async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return ApiError.badRequest(
				res,
				"No file uploaded. Please send file with field name 'avatar'",
			);
		}

		const {url, fileId} = await authService.avatarUpload(req.user.id, file);

		return ApiResponse.ok(res, 'Avatar uploaded successfully', {
			avatarUrl: url,
			fileId,
		});
	} catch (error) {
		return ApiError.internal(res, error.message || 'Failed to upload avatar');
	}
};

const healthCheck = async (req, res) => {
	const msg = 'Health Check';
	ApiResponse.ok(res, msg);
};

export {
	register,
	login,
	getMe,
	logout,
	verifyEmail,
	healthCheck,
	refresh,
	forgotPassword,
	resetPassword,
	uploadAvatar,
};
