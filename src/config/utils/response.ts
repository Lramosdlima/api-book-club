import { HttpStatus } from '../../types/http_status_type';

export type ErrorTypes = string | unknown | null;

export type APIResponse<Data, Error> = {
    status: boolean;
    data: Data;
    error: Error;
    codehttp: number;
}

export class ResponseOn {
    success<Data>(data: Data, codehttp?: number): APIResponse<Data, null> {
        return {
            status: true,
            data,
            error: null,
            codehttp: codehttp ?? HttpStatus.OK,
        };
    }

    unsuccessfully<Error>(error: Error, codeHttp?: number): APIResponse<null, Error> {
        return {
            status: true,
            data: null,
            error,
            codehttp: codeHttp ?? HttpStatus.BAD_REQUEST,
        };
    }   

    error<Error>(error: Error): APIResponse<null, Error> {
        console.log(error);
        return {
            status: false,
            data: null,
            error,
            codehttp: HttpStatus.INTERNAL_SERVER_ERROR,
        };
    }
}
