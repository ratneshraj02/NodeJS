import express from 'express';
import { BOOKS } from '../models/book.js';
import {
	getAllBook,
	getBookById,
	createBook,
	deleteBookById,
} from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', getAllBook);

router.get('/:id', getBookById);

router.post('/', createBook);

router.delete('/:id', deleteBookById);

export default router;
