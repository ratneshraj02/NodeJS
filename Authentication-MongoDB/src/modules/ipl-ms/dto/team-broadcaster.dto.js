import Joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';

class CreateTeamBroadcasterDto extends BaseDto {
	static schema = Joi.object({
		teamId: BaseDto.objectId.required(),
		broadcasterId: BaseDto.objectId.required(),
	});
}

class UpdateTeamBroadcasterDto extends BaseDto {
	static schema = Joi.object({
		teamId: BaseDto.objectId,
		broadcasterId: BaseDto.objectId,
	}).min(1);
}

export { CreateTeamBroadcasterDto, UpdateTeamBroadcasterDto };
