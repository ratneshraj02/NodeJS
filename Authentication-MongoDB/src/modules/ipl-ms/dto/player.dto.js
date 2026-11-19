import Joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';

const PLAYER_ROLES = ['Batsman', 'Bowler', 'All-Rounder', 'Wicker-Keeper'];

const name = Joi.string().trim().min(2).max(100);
const role = Joi.string().valid(...PLAYER_ROLES);
const teamId = BaseDto.objectId;

class CreatePlayerDto extends BaseDto {
	static schema = Joi.object({
		name: name.required(),
		role: role.required(),
		teamId: teamId.required(),
	});
}

class UpdatePlayerDto extends BaseDto {
	static schema = Joi.object({
		name,
		role,
		teamId,
	}).min(1);
}

class UpdatePlayerRoleDto extends BaseDto {
	static schema = Joi.object({
		role: role.required(),
	});
}

class TransferPlayerDto extends BaseDto {
	static schema = Joi.object({
		teamId: teamId.required(),
	});
}

export {
	CreatePlayerDto,
	UpdatePlayerDto,
	UpdatePlayerRoleDto,
	TransferPlayerDto,
};
