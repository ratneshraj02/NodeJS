import { Router } from 'express';
import * as playerController from '../controllers/player.controller.js';
import { authenticate } from '../../auth/auth.middleware.js';
import {
	CreatePlayerDto,
	UpdatePlayerDto,
	UpdatePlayerRoleDto,
	TransferPlayerDto,
} from '../dto/player.dto.js';
import validate from '../../../common/middleware/validate.middleware.js';

const router = Router();

// All player routes require a valid logged-in user
router.use(authenticate);

//create a new player
router.post('/', validate(CreatePlayerDto), playerController.createPlayer);

//Get all player
router.get('/', playerController.getAllPlayer);

//get player by team
router.get('/team/:teamId', playerController.getPlayerByTeam);

//get player by Id
router.get('/:id', playerController.getPlayerById);

//update player by id
router.put('/:id', validate(UpdatePlayerDto), playerController.updatePlayer);

//update player role by id
router.patch(
	'/:id/role',
	validate(UpdatePlayerRoleDto),
	playerController.updatePlayerRole,
);

//transfer player to another team
router.patch(
	'/:id/transfer',
	validate(TransferPlayerDto),
	playerController.transferPlayer,
);

//delete player by Id
router.delete('/:id', playerController.deletePlayer);

export default router;
