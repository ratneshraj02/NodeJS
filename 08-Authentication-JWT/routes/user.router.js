import express from 'express';
import db from '../db/index.js';
import { loginController, signupController } from '../controller/user.controller.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'node:crypto';


const router = express.Router();



router.get('/', userController);


router.post('/login', loginController)
router.post('/signup', signupController);


export default router;