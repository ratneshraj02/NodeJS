import { Router } from 'express';
import * as teamBroadcasterController from '../controllers/team-broadcaster.controller.js';
import { authenticate } from '../../auth/auth.middleware.js';
import {
	CreateTeamBroadcasterDto,
	UpdateTeamBroadcasterDto,
} from '../dto/team-broadcaster.dto.js';
import validate from '../../../common/middleware/validate.middleware.js';

const router = Router();

// All team-broadcaster routes require a valid logged-in user
router.use(authenticate);

//assign a broadcaster to a team
router.post(
	'/',
	validate(CreateTeamBroadcasterDto),
	teamBroadcasterController.createTeamBroadcaster,
);

//Get all team-broadcaster
router.get('/', teamBroadcasterController.getAllTeamBroadcaster);

//get team-broadcaster by Id
router.get('/:id', teamBroadcasterController.getTeamBroadcasterById);

//update team-broadcaster by id
router.put(
	'/:id',
	validate(UpdateTeamBroadcasterDto),
	teamBroadcasterController.updateTeamBroadcaster,
);

//unassign a broadcaster from a team
router.delete('/:id', teamBroadcasterController.deleteTeamBroadcaster);

export default router;
