import Joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';

class CreateTeamDto extends BaseDto {
	static schema = Joi.object({
		name: Joi.string().trim().min(2).max(100).required(),
		ownerId: BaseDto.objectId.required(),
	});
}

class UpdateTeamDto extends BaseDto {
	static schema = Joi.object({
		name: Joi.string().trim().min(2).max(100),
		ownerId: BaseDto.objectId,
	}).min(1);
}

export { CreateTeamDto, UpdateTeamDto };
