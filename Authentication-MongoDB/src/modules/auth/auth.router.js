import { Router } from 'express';
import RegisterDto from './dto/register.dto.js';
import LoginDto from './dto/login.dto.js';
import ForgotPasswordDto from './dto/forgot-password.dto.js';
import ResetPasswordDto from './dto/reset-password.dto.js';
import * as controller from './auth.controller.js';
import validate from '../../common/middleware/validate.middleware.js';
import { authenticate } from './auth.middleware.js';

const router = Router();

router.get('/health-check', controller.healthCheck);

router.post('/register', validate(RegisterDto), controller.register);

router.post('/login', validate(LoginDto), controller.login);

router.post('/refresh-token', controller.refresh);

router.post('logout', authenticate, controller.logout);

router.get('/verify-email/:token', controller.verifyEmail);
router.post(
	'forgot-password',
	validate(ForgotPasswordDto),
	controller.forgotPassword,
);

router.put(
	'/reset-password',
	validate(ResetPasswordDto),
	controller.resetPassword
);

router.get('/me', authenticate, controller.getMe);

export default router;
