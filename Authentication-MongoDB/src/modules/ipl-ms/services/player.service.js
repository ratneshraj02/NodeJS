import ApiError from '../../../common/utils/api-error.js';
import Team from '../models/team.model.js';
import Player from '../models/player.mode.js';

const createPlayer = async (name, role, teamId) => {
	const already = await Player.findOne({ name, teamId, role });

	if (already) {
		throw ApiError.conflict('Player already exist!!');
	}

	const team = await Team.findById(teamId);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const player = await Player.create({
		name,
		role,
		teamId,
	});

	return player;
};

const getAllPlayer = async () => {
	const players = await Player.find();

	if (players.length <= 0) {
		throw ApiError.notfound('Player not found');
	}

	return players;
};

const getPlayerById = async (playerId) => {
	const player = await Player.findById(playerId);

	return player;
};

const updatePlayer = async (playerId, name, role, teamId) => {
	const player = await Player.findById(playerId);

	if (!player) {
		throw ApiError.notfound('Player not found');
	}

	const updatedPlayer = await Player.findByIdAndUpdate(
		playerId,
		{
			name,
			role,
			teamId,
		},
		{
			new: true,
			runValidators: true,
		},
	);

	return updatedPlayer;
};

const deletePlayer = async (playerId) => {
	const player = await Player.findById(playerId);

	if (!player) {
		throw ApiError.notfound('Player not found');
	}

	const delPlayer = await Player.findByIdAndDelete(playerId);

	return delPlayer;
};

const transferPlayer = async (playerId, newTeamId) => {
	const team = await Team.findById(newTeamId);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const player = await Player.findByIdAndUpdate(
		playerId,
		{ teamId: newTeamId },
		{
			new: true,
			runValidators: true,
		},
	).populate('teamId', 'name');

	if (!player) {
		throw ApiError.notfound('Player not found');
	}

	return player;
};

const getPlayerByTeam = async (teamId) => {
	const players = await Player.find({ teamId });

	if (players.length <= 0) {
		throw ApiError.notfound('Player not found');
	}

	return players;
};

const updatePlayerRole = async (playerId, role) => {
	const player = await Player.findByIdAndUpdate(
		playerId,
		{ role },
		{ new: true, runValidators: true },
	);

	if (!player) {
		throw ApiError.notfound('Player not found');
	}

	return player;
};

export {
	transferPlayer,
	updatePlayerRole,
	getPlayerByTeam,
	createPlayer,
	getAllPlayer,
	getPlayerById,
	updatePlayer,
	deletePlayer,
};
