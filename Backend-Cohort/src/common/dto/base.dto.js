import Joi from "joi";

class BaseDto { 
    
    static schema = Joi.object({});

    static validate(data) {
        const {error, data } = this.schema.validate(data, {
            abortEarly: true,
            stripUnknown : true,
        })

        if (error) {
            const error = error.details.map((e) => e.message)
            return {error, value : null}
        }

        return { error: null, data }
    }
}

export default BaseDto;