class ApiError extends Error {

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperation = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bed request") {
        return new ApiError(400, message);
    }

    static unauthorized(message = "Unauthorized Access") {
        return new ApiError(403, message);
    }

    static conflict(message = "Conflict") {
        return new ApiError(409, message);
    }
}

export default ApiError;