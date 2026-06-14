import express from 'express';
import { booksTable, authorTable } from '../models/index.js';
import {
	getAllAuthor,
	getAuthorById,
	createAuthor,
    deleteAuthor,
    bookByAuthor
} from '../controllers/author.controller.js';

const router = express.Router();

router.get('/', getAllAuthor);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);
router.get('/:id/books', bookByAuthor);
router.delete('/:id', deleteAuthor);

    

export default router;
