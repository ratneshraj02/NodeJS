import * as teamSponsorService from '../services/team-sponsor.service.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createTeamSponsor = async (req, res) => {
	const { teamId, sponsorId } = req.body;
	const teamSponsor = await teamSponsorService.createTeamSponsor(
		teamId,
		sponsorId,
	);
	ApiResponse.created(res, 'Sponsor attached to team successfully', teamSponsor);
};

const getAllTeamSponsor = async (req, res) => {
	const teamSponsors = await teamSponsorService.getAllTeamSponsor();
	ApiResponse.ok(res, 'Team sponsors fetch successfully', teamSponsors);
};

const getTeamSponsorById = async (req, res) => {
	const teamSponsor = await teamSponsorService.getTeamSponsorById(
		req.params.id,
	);
	ApiResponse.ok(res, 'Team sponsor is fetched', teamSponsor);
};

const updateTeamSponsor = async (req, res) => {
	const { teamId, sponsorId } = req.body;
	const teamSponsor = await teamSponsorService.updateTeamSponsor(
		req.params.id,
		teamId,
		sponsorId,
	);
	ApiResponse.ok(res, 'Team sponsor updated successfully', teamSponsor);
};

const deleteTeamSponsor = async (req, res) => {
	const teamSponsor = await teamSponsorService.deleteTeamSponsor(req.params.id);
	ApiResponse.ok(res, 'Sponsor detached from team successfully', teamSponsor);
};

export {
	createTeamSponsor,
	getAllTeamSponsor,
	getTeamSponsorById,
	updateTeamSponsor,
	deleteTeamSponsor,
};
