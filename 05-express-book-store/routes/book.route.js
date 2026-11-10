import express from 'express';
import { booksTable, authorTable} from '../models/index.js';
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
