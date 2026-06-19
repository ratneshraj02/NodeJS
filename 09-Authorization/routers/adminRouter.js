import express from 'express';
import { adminLogin } from '../controller/adminController.js';

const router = express.Router();

router.get('/', adminLogin);

export { router };
