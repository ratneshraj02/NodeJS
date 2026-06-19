import express from 'express';
import {
	signController,
	loginController,
	isLoginController,
} from '../controller/index.js';

import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', ensureAuthenticated, signController);
router.post('/login', ensureAuthenticated, loginController);
router.get('/', ensureAuthenticated, isLoginController);

export default router;
