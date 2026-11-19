import Joi from 'joi';

class BaseDto {
	static schema = Joi.object({});

	static objectId = Joi.string().pattern(
		/^[0-9a-fA-F]{24}$/,
		'must be a valid ObjectId',
	);

	static validate(data) {
		const {error, value} = this.schema.validate(data, {
			abortEarly: false,
			stripUnknown: true,
        });
        
		if (error) {
            const errors = error.details.map((e) => e.message);
			return { errors, value: null };
		}
		return { errors: null, value };
	}
}

export default BaseDto;
