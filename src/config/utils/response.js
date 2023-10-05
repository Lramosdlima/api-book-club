class ResponseOn {
    static success(data, statusCode) {
        return {
            status: true,
            data,
            statusCode,
        };
    }

    static error(error, statusCode) {
        return {
            status: false,
            error,
            statusCode,
        };
    }
}

module.exports = ResponseOn;