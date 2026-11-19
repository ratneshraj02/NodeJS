import { Router } from 'express';
import * as broadcasterController from '../controllers/broadcaster.controller.js';
import { authenticate } from '../../auth/auth.middleware.js';
import {
	CreateBroadcasterDto,
	UpdateBroadcasterDto,
} from '../dto/broadcaster.dto.js';
import validate from '../../../common/middleware/validate.middleware.js';

const router = Router();

// All broadcaster routes require a valid logged-in user
router.use(authenticate);

//create a new broadcaster
router.post(
	'/',
	validate(CreateBroadcasterDto),
	broadcasterController.createBroadcaster,
);

//Get all broadcaster
router.get('/', broadcasterController.getAllBroadcaster);

//get broadcaster by Id
router.get('/:id', broadcasterController.getBroadcasterById);

//update broadcaster by id
router.put(
	'/:id',
	validate(UpdateBroadcasterDto),
	broadcasterController.updateBroadcaster,
);

//delete broadcaster by Id
router.delete('/:id', broadcasterController.deleteBroadcaster);

export default router;
