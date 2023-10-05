class ResponseOn {
    success(data, codehttp) {
        return {
            status: true,
            data,
            codehttp,
        };
    }

    error(error, codehttp) {
        return {
            status: false,
            error,
            codehttp,
        };
    }
}

module.exports = ResponseOn;