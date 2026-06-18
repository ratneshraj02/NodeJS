import express from 'express';
import db from '../db/index.js';
import { userController } from '../controller/user.controller.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'node:crypto';


const router = express.Router();



router.get('/', userController);



export default router;