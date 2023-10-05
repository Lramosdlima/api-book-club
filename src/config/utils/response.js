
class ResponseOn {
    constructor() {
        this.success = success;
        this.error = error;
    }
}

const success = (data, codeHttp) => {
    return { status: true, codeHttp, data };
};

const error = (error, codeHttp) => {
    return { status: false, codeHttp, error };
};

module.exports = {
    ResponseOn,
};