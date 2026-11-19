import { Router } from 'express';
import * as teamController from '../controllers/team.controller.js';
import { authenticate } from '../../auth/auth.middleware.js';
import { CreateTeamDto, UpdateTeamDto } from '../dto/team.dto.js';
import validate from '../../../common/middleware/validate.middleware.js';

const router = Router();

// All team routes require a valid logged-in user
router.use(authenticate);

//create a new team
router.post('/', validate(CreateTeamDto), teamController.createTeam);

//Get all team
router.get('/', teamController.getAllTeam);

//get team by Id
router.get('/:id', teamController.getTeamById);

//update team by id
router.put('/:id', validate(UpdateTeamDto), teamController.updateTeam);

//delete team by Id
router.delete('/:id', teamController.deleteTeam);

export default router;
