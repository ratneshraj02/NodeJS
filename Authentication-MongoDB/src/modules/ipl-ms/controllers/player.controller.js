import * as playerService from '../services/player.service.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createPlayer = async (req, res) => {
	const { name, role, teamId } = req.body;
	const player = await playerService.createPlayer(name, role, teamId);
	ApiResponse.created(res, 'Player created successfully', player);
};

const getAllPlayer = async (req, res) => {
	const players = await playerService.getAllPlayer();
	ApiResponse.ok(res, 'Players fetch successfully', players);
};

const getPlayerByTeam = async (req, res) => {
	const players = await playerService.getPlayerByTeam(req.params.teamId);
	ApiResponse.ok(res, 'Players fetch successfully', players);
};

const getPlayerById = async (req, res) => {
	const player = await playerService.getPlayerById(req.params.id);
	ApiResponse.ok(res, 'Player is fetched', player);
};

const updatePlayer = async (req, res) => {
	const { name, role, teamId } = req.body;
	const player = await playerService.updatePlayer(
		req.params.id,
		name,
		role,
		teamId,
	);
	ApiResponse.ok(res, 'Player updated successfully', player);
};

const updatePlayerRole = async (req, res) => {
	const player = await playerService.updatePlayerRole(
		req.params.id,
		req.body.role,
	);
	ApiResponse.ok(res, 'Player role updated successfully', player);
};

const transferPlayer = async (req, res) => {
	const player = await playerService.transferPlayer(
		req.params.id,
		req.body.teamId,
	);
	ApiResponse.ok(res, 'Player transferred successfully', player);
};

const deletePlayer = async (req, res) => {
	const player = await playerService.deletePlayer(req.params.id);
	ApiResponse.ok(res, 'Player deleted successfully', player);
};

export {
	createPlayer,
	getAllPlayer,
	getPlayerByTeam,
	getPlayerById,
	updatePlayer,
	updatePlayerRole,
	transferPlayer,
	deletePlayer,
};
