import Team from '../models/team.model.js';
import Owner from '../models/owner.model.js';
import ApiError from '../../../common/utils/api-error.js';

const createTeam = async ({ name, ownerId }) => {
	const already = await Team.findOne({ name });

	if (already) {
		throw ApiError.conflict("Team already exist");
	}


	const owner = await Owner.findById(ownerId);

	if (!owner) {
		throw ApiError.notfound('Owner not found');
	}

	const team = await Team.create({
		name,
		ownerId,
	});

	return team;
};

const getAllTeam = async () => {
	const teams = await Team.find();
	return teams;
};

const getTeamById = async ({ teamId }) => {
	const team = await Team.findById(teamId);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	return team;
};

const updateTeam = async ({ teamId, name, ownerId }) => {
	const team = await Team.findByIdAndUpdate(
		teamId,
		{ name, ownerId },
		{ new: true, runValidators: true },
	);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	return team;
};

const deleteTeam = async ({ teamId }) => {
	const team = await Team.findByIdAndDelete(teamId);
	return team;
};

export { createTeam, getAllTeam, getTeamById, updateTeam, updateTeam };
