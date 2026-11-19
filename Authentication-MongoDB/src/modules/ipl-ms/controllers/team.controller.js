import * as teamService from '../services/team.service.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createTeam = async (req, res) => {
	const team = await teamService.createTeam(req.body);
	ApiResponse.created(res, 'Team created successfully', team);
};

const getAllTeam = async (req, res) => {
	const teams = await teamService.getAllTeam();
	ApiResponse.ok(res, 'Teams fetch successfully', teams);
};

const getTeamById = async (req, res) => {
	const team = await teamService.getTeamById({ teamId: req.params.id });
	ApiResponse.ok(res, 'Team is fetched', team);
};

const updateTeam = async (req, res) => {
	const team = await teamService.updateTeam({
		teamId: req.params.id,
		...req.body,
	});
	ApiResponse.ok(res, 'Team updated successfully', team);
};

const deleteTeam = async (req, res) => {
	const team = await teamService.deleteTeam({ teamId: req.params.id });
	ApiResponse.ok(res, 'Team deleted successfully', team);
};

export { createTeam, getAllTeam, getTeamById, updateTeam, deleteTeam };
