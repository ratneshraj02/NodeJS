import express from 'express';
import { signController, adminLogin } from '../controller/index.js';

const router = express.Router();


router.post('/', signController);


export default router;