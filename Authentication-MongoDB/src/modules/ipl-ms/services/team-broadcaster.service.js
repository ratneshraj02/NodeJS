import Team from '../models/team.model.js';
import ApiError from '../../../common/utils/api-error.js';
import Broadcaster from '../models/broadcaster.model.js';
import TeamBroadcaster from '../models/team-broadcaster.model.js';

const createTeamBroadcaster = async (teamId, broadcasterId) => {
	const team = await Team.findById(teamId);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const broadcaster = await Broadcaster.findById(broadcasterId);

	if (!broadcaster) {
		throw ApiError.notfound('Broadcaster not found');
	}

	const existing = await TeamBroadcaster.findOne({ teamId, broadcasterId });

	if (existing) {
		throw ApiError.conflict('Broadcaster already assigned to this team');
	}

	const teamBroadcaster = await TeamBroadcaster.create({
		teamId,
		broadcasterId,
	});

	return teamBroadcaster;
};

const getAllTeamBroadcaster = async () => {
	const teamBroadcasters = await TeamBroadcaster.find();

	if (teamBroadcasters.length <= 0) {
		throw ApiError.notfound('Team Broadcaster not found');
	}
	return teamBroadcasters;
};

const getTeamBroadcasterById = async (teamBroadcasterId) => {
	const teamBroadcaster = await TeamBroadcaster.findById(teamBroadcasterId);

	if (!teamBroadcaster) {
		throw ApiError.notfound('Team Broadcaster not found');
	}
	return teamBroadcaster;
};

const updateTeamBroadcaster = async (
	teamBroadcasterId,
	teamId,
	broadcasterId,
) => {
	const team = await Team.findById(teamId);
	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const broadcaster = await Broadcaster.findById(broadcasterId);

	if (!broadcaster) {
		throw ApiError.notfound('Broadcaster not found');
	}

	const teamBroadcaster = await TeamBroadcaster.findByIdAndUpdate(
		teamBroadcasterId,
		{ teamId, broadcasterId },
		{ new: true, runValidators: true },
	);

	return teamBroadcaster;
};

const deleteTeamBroadcaster = async (teamBroadcasterId) => {
	const teamBroadcaster =
		await TeamBroadcaster.findByIdAndDelete(teamBroadcasterId);

	if (!teamBroadcaster) {
		throw ApiError.notfound('Team Broadcaster not found');
	}

	return teamBroadcaster;
};

const assignBroadcaster = async (teamId, broadcasterId) => {
	const team = await Team.findById(teamId);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const broadcaster = await Broadcaster.findById(broadcasterId);

	if (!broadcaster) {
		throw ApiError.notfound('Broadcaster not found');
	}

	const existing = await TeamBroadcaster.findOne({ teamId, broadcasterId });

	if (existing) {
		throw ApiError.conflict('Broadcaster already assigned to this team');
	}

	const teamBroadcaster = await TeamBroadcaster.create({
		teamId,
		broadcasterId,
	});

	return teamBroadcaster;
};

export {
	createTeamBroadcaster,
	getAllTeamBroadcaster,
	getTeamBroadcasterById,
	updateTeamBroadcaster,
	deleteTeamBroadcaster,
	assignBroadcaster,
};
