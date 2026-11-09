import router from './auth.router.js';
import * as authService from './auth.service.js';
import ApiResponse from '../../common/utils/api-response.js';
import cookieParser from 'cookie-parser';

const register = async (req, res) => {
	const user = await authService.register(req.body);
	ApiResponse.created(res, 'Register Successfully', user);
};

const login = async (req, res) => {
	const { user, accessToken, refreshToken } = await authService.login(req.body);

	res.cookieParser('accessToken', accessToken, {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 60 * 1000, //7Day
	});

	res.cookieParser('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 60 * 1000, //7Day
	});

	return ApiResponse.ok(res, 'Login successfully', { user, accessToken });
};

const logout = async (req, res) => {
	await authService.logout(req.user.id);
	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');
	ApiResponse.ok(res, 'Logout Successfully');
};

const verifyEmail = async (req, res) => {
	const user = authService.verifyEmail(res.params.token);
	ApiResponse.ok(res, "User verified", user);
}

const getMe = async (req, res) => {
	const user = await authService.getMe(req.user.id);
	ApiResponse.ok(res, "User Profile", user);
};

const healthCheck = async (req, res) => {
	const msg = "Health Check";
	ApiResponse.ok(res, msg,);
}

export { register, login, getMe, logout, verifyEmail, healthCheck};
