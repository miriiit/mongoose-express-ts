import HttpStatusCodes from "http-status-codes";

type TStatus = 0 | 1 | -1;

export type ResModel = {
    status: TStatus,
    msg: string,
    code?: number,
    isError?: boolean,
    result?: any,
    token?: string
}

export const success = (httpRequest: Request, status: TStatus, message: string, results: any, httpStatusCode: number) => {
    return {
        status: status,
        msg: message,
        code: httpStatusCode,
        isError: false,
        result: results
    }
}

export const genericResponse = (status: TStatus = 0, code: number, msg: string) => {
    let res: ResModel = {
        "status": status,
        "code": code,
        "msg": msg
    };
    return res;
};

export const error = (httpRequest: any, msg: string, httpStatusCode: number) => {
    // HTTP request code
    const httpStatusCodes = [200, 201, 400, 401, 404, 403, 422, 500];
    // Get matched code
    const findCode = httpStatusCodes.find((code) => code == httpStatusCode);

    if (!findCode) httpStatusCode = 500;
    else httpStatusCode = findCode;

    let res: ResModel = {
        status: -1,
        msg: `${httpRequest.method} - ${msg}!`,
        code: httpStatusCode,
        isError: true,
        result: null
    };
    return res;
};


export const genericError = (status: TStatus = 0, msg: string) => {
    let res: ResModel = {
        status: status,
        msg: msg,
        result: null
    };
    return res;
};

export const genericSuccess = (status: TStatus = 0, msg: string, result: any, token: string = "") => {
    let res: ResModel = {
        status: status,
        msg: msg,
        result: result,
        token: token
    }
    return res;
}

export const validation = (httpRequest: Request, message: string) => {
    let res: ResModel = {
        status: -1,
        msg: `${httpRequest.method} - ${message}`,
        isError: true,
        code: 422,
    };
    return res;
};