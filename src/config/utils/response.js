class ResponseOn {
    success(data, codehttp) {
        return {
            status: true,
            data,
            error: null,
            codehttp,
        };
    }

    error(error, codehttp) {
        return {
            status: false,
            data: null,
            error,
            codehttp,
        };
    }
}

module.exports = ResponseOn;