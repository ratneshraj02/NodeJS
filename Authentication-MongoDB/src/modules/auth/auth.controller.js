import * as authService from './auth.service.js';
import ApiResponse from '../../common/utils/api-response.js';

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
	res.cookieParser('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000, //7 Day
	});

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
};
