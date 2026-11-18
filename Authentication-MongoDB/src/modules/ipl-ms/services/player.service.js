import ApiError from '../../../common/utils/api-error.js';
import Team from '../models/team.model.js';
import Player from '../models/player.mode.js';


//CREATE READ  UPDATE DELETE

const transferPlayer = async (playerId, newTeamId) => {
	const team = await Team.findById(newTeamId);

	if (!team) {
		throw ApiError.notfound('Team not found');
	}

	const player = Player.findByIdAndUpdate(
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
    
    if (players.length < 0) {
        throw ApiError.notfound("Player not found");
    }

    return players;
}

const updatePlayerRole = async (playerId, role) => {
	const player = await Player.findByIdAndUpdate(
		playerId,
		{ role },
		{ new: true, runValidators: true },
    );
    
    if (!player) {
        throw ApiError.notfound("Player not found");
    }
};

export { transferPlayer, updatePlayerRole, getPlayerByTeam };
