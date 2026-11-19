import { Router } from 'express';
import * as teamSponsorController from '../controllers/team-sponsor.controller.js';
import { authenticate } from '../../auth/auth.middleware.js';
import {
	CreateTeamSponsorDto,
	UpdateTeamSponsorDto,
} from '../dto/team-sponsor.dto.js';
import validate from '../../../common/middleware/validate.middleware.js';

const router = Router();

// All team-sponsor routes require a valid logged-in user
router.use(authenticate);

//attach a sponsor to a team
router.post(
	'/',
	validate(CreateTeamSponsorDto),
	teamSponsorController.createTeamSponsor,
);

//Get all team-sponsor
router.get('/', teamSponsorController.getAllTeamSponsor);

//get team-sponsor by Id
router.get('/:id', teamSponsorController.getTeamSponsorById);

//update team-sponsor by id
router.put(
	'/:id',
	validate(UpdateTeamSponsorDto),
	teamSponsorController.updateTeamSponsor,
);

//detach a sponsor from a team
router.delete('/:id', teamSponsorController.deleteTeamSponsor);

export default router;
