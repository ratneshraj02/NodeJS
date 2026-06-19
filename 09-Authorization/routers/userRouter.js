import express from 'express';
import {
	signController,
	adminLogin,
	loginController,
	isLoginController,
} from '../controller/index.js';

const router = express.Router();

router.post('/signup', signController);
router.post('/login', loginController);
router.get('/', isLoginController);

export default router;
