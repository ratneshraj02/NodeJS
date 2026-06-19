import express from 'express';
import { seeAllUser } from '../controller/adminController.js';
import {
	ensureAuthenticated,
	restrictToRole,
} from '../middleware/authMiddleware.js';

const router = express.Router();

const adminRestrictedMiddleware = restrictToRole('ADMIN');

router.use(ensureAuthenticated);
router.use(adminRestrictedMiddleware);

router.get('/users', seeAllUser);

export default router;
