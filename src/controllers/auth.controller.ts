import { Response, Request } from "express";
import { validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import { ResModel, error } from "../helper/response-composer";
import { authUserService, findByEmailUserService } from "../services/auth.service";


export const authenticateUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let result = error(req, "No valid body recieved", HttpStatusCodes.BAD_REQUEST);
        result = Object.assign({}, result, { 'errors': errors.array() });
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ ...result });

        // .json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let result: ResModel = await authUserService({ email, password });

    try {
        res.setHeader('x-auth-token', result.token);
        res.send(JSON.stringify(result));
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(result));
    }
}


export const findByUserEmail = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let result = error(req, "No valid body recieved", HttpStatusCodes.BAD_REQUEST);
        result = Object.assign({}, result, { 'errors': errors.array() });
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ ...result });

    }

    const email = req.query.email;
    let result: ResModel = await findByEmailUserService({ email: '' + email });

    try {
        return res.send(JSON.stringify(result));
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(result));
    }
}