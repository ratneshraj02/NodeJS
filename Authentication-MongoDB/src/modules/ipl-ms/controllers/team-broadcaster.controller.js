import * as teamBroadcasterService from '../services/team-broadcaster.service.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createTeamBroadcaster = async (req, res) => {
	const { teamId, broadcasterId } = req.body;
	const teamBroadcaster =
		await teamBroadcasterService.createTeamBroadcaster(
			teamId,
			broadcasterId,
		);
	ApiResponse.created(
		res,
		'Broadcaster assigned to team successfully',
		teamBroadcaster,
	);
};

const getAllTeamBroadcaster = async (req, res) => {
	const teamBroadcasters =
		await teamBroadcasterService.getAllTeamBroadcaster();
	ApiResponse.ok(res, 'Team broadcasters fetch successfully', teamBroadcasters);
};

const getTeamBroadcasterById = async (req, res) => {
	const teamBroadcaster =
		await teamBroadcasterService.getTeamBroadcasterById(req.params.id);
	ApiResponse.ok(res, 'Team broadcaster is fetched', teamBroadcaster);
};

const updateTeamBroadcaster = async (req, res) => {
	const { teamId, broadcasterId } = req.body;
	const teamBroadcaster =
		await teamBroadcasterService.updateTeamBroadcaster(
			req.params.id,
			teamId,
			broadcasterId,
		);
	ApiResponse.ok(res, 'Team broadcaster updated successfully', teamBroadcaster);
};

const deleteTeamBroadcaster = async (req, res) => {
	const teamBroadcaster =
		await teamBroadcasterService.deleteTeamBroadcaster(req.params.id);
	ApiResponse.ok(
		res,
		'Broadcaster unassigned from team successfully',
		teamBroadcaster,
	);
};

export {
	createTeamBroadcaster,
	getAllTeamBroadcaster,
	getTeamBroadcasterById,
	updateTeamBroadcaster,
	deleteTeamBroadcaster,
};
