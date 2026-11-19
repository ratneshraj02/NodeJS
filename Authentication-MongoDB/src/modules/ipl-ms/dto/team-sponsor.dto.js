import Joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';

class CreateTeamSponsorDto extends BaseDto {
	static schema = Joi.object({
		teamId: BaseDto.objectId.required(),
		sponsorId: BaseDto.objectId.required(),
	});
}

class UpdateTeamSponsorDto extends BaseDto {
	static schema = Joi.object({
		teamId: BaseDto.objectId,
		sponsorId: BaseDto.objectId,
	}).min(1);
}

export { CreateTeamSponsorDto, UpdateTeamSponsorDto };
