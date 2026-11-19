import Team from '../models/team.model.js';
import TeamSponsor from '../models/team-sponsor.model.js';
import Sponsor from '../models/sponsor.model.js';
import ApiError from '../../../common/utils/api-error.js';

const createTeamSponsor = async (teamId, sponsorId) => {
	const alreadyTeamSponsor = await TeamSponsor.findOne({ teamId, sponsorId });

	if (alreadyTeamSponsor) {
		throw ApiError.conflict('Team Sponsor already exist');
	}

	const team = await Team.findById(teamId);
	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const sponsor = await Sponsor.findById(sponsorId);
	if (!sponsor) {
		throw ApiError.notfound('Sponsor not found');
	}
	const teamSponsor = await TeamSponsor.create({ teamId, sponsorId });

	return teamSponsor;
};

const getAllTeamSponsor = async () => {
	const teamSponsors = await TeamSponsor.find();

	if (teamSponsors.length <= 0) {
		throw ApiError.notfound('Team Sponsor not found');
	}
	return teamSponsors;
};

const getTeamSponsorById = async (teamSponsorId) => {
	const teamSponsor = await TeamSponsor.findById(teamSponsorId);

	if (!teamSponsor) {
		throw ApiError.notfound('Team Sponsor not found');
	}

	return teamSponsor;
};

const updateTeamSponsor = async (teamSponsorId, teamId, sponsorId) => {
	const teamSponsor = await TeamSponsor.findByIdAndUpdate(
		teamSponsorId,
		{
			teamId,
			sponsorId,
		},
		{
			new: true,
			runValidators: true,
		},
	);

	if (!teamSponsor) {
		throw ApiError.notfound('Team Sponsor not found');
	}

	return teamSponsor;
};

const deleteTeamSponsor = async (teamSponsorId) => {
	const teamSponsor = await TeamSponsor.findByIdAndDelete(teamSponsorId);

	if (!teamSponsor) {
		throw ApiError.notfound('Team Sponsor not found');
	}
	return teamSponsor;
};

const attachSponsor = async (sponsorId, teamId) => {
	const team = await Team.findById(teamId);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const sponsor = await Sponsor.findById(sponsorId);

	if (!sponsor) {
		throw ApiError.notfound('Sponsor not found');
	}

	const existing = await TeamSponsor.findOne({ teamId, sponsorId });

	if (existing) {
		throw ApiError.conflict('Sponsor already attached to this team');
	}

	const teamSponsor = await TeamSponsor.create({ teamId, sponsorId });

	return teamSponsor;
};

export {
	createTeamSponsor,
	getAllTeamSponsor,
	getTeamSponsorById,
	updateTeamSponsor,
	deleteTeamSponsor,
	attachSponsor,
};
