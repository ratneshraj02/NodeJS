
const validate = (dtoClass) => {
    return (req, res, next) => {
        const { value, errors} = dtoClass.validate(req.body);

        if (errors) {
            throw ApiError.badRequest(error.join("; "))
        }
        req.body = value;
        next()
    }
}

export default validate;