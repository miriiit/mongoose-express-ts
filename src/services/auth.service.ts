
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import { genericError, genericSuccess, ResModel } from "../helper/response-composer";

import { User, IUser, TUser } from "../models/user";
import { TUserResponse } from "../types/user-response";

export const authUserService = function (userPayload: TUser): Promise<ResModel> {
    let result: TUserResponse = { token: '', email: '', errors: [] };

    return new Promise(async (resolve, reject) => {
        try {
            let user: IUser = await User.findOne({ email: userPayload.email });

            if (!user) {
                result.errors = [{
                    msg: "Invalid Credentials",
                }];
                reject(result);
            }

            const isMatch = await bcrypt.compare(userPayload.password, user.password);
            if (!isMatch) {
                result.errors = [{
                    msg: "Invalid Credentials",
                }];
                reject(result);
            }

            const payload: TUser & { userId: string } = {
                userId: user.id,
                email: userPayload.email
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: config.get("jwtExpiration") },
                (err, token) => {
                    if (err) throw err;
                    let res = genericSuccess(1, "User fetch successfully", { email: userPayload.email, token }, token);
                    resolve(res);
                }
            );
        } catch (err) {
            let res = genericError(0, err.message || "Server Error");
            reject(res);
        }
    });
};


export const findByEmailUserService = function (userPayload: TUser): Promise<ResModel> {
    let result: TUserResponse = { token: '', email: '', errors: [] };

    return new Promise(async (resolve, reject) => {
        try {
            let user: IUser = await User.findOne({ email: userPayload.email });

            if (!user) {
                result.errors = [{
                    msg: "No User found by this email",
                }];
                reject(result);
            }

            let res = genericSuccess(1, "User fetch successfully", { email: userPayload.email });
            resolve(res);
        } catch (err) {
            let res = genericError(0, err.message || "Server Error");
            reject(res);
        }
    });
};