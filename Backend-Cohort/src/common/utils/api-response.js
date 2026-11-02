class ApiResponse {

    static ok(res, message, data = null) {
        res
            .status(200)
            .json({
                success: true,
                message,
                data
            });
    }


    static created(req, message, data = null) {
        res.status(201).json({
            success: true,
            message,
            data,
        })
    }

    static onCreated(res) {
        return res.status(204).send();
    }
}

export default ApiResponse;