import { Response, Request } from "express";
import { validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import { TUserResponse } from "../types/user-response";
import { registUserService } from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    let result: TUserResponse = await registUserService({ email, password });
    try {
        return res.json({ msg: "User Created successfully", ...result});
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message:
                err.message || "Some error occurred while Creating user.",
        });
    }
    
}