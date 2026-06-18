import express from 'express';
import db from '../db/index.js';
import {
	isLoginController,
	loginController,
	signupController,
	updateController,
} from '../controller/user.controller.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'node:crypto';
import { userTable } from '../db/schema.js';

const router = express.Router();

router.patch('/', updateController);
router.get('/', isLoginController);
router.post('/login', loginController);
router.post('/signup', signupController);

export default router;
