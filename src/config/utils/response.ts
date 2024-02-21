export class ResponseOn {
    success(data: any, codehttp: number) {
        return {
            status: true,
            data,
            error: null,
            codehttp,
        };
    }

    error(error: any, codehttp: number = 500) {
        console.log(error);
        return {
            status: false,
            data: null,
            error,
            codehttp,
        };
    }
}
