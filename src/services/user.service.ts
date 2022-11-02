
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import { TUserResponse } from "../types/user-response";

import {User, IUser, TUser } from "../models/user";

export const registUserService = function(userPayload: TUser, filters: any = {}): Promise<TUserResponse> {
    let result: TUserResponse = { token: '', email: '', errors: []};

    return new Promise(async (resolve, reject) => {
       
        try {
            let user: IUser = await User.findOne({ email: userPayload.email });
    
            if (user) {
                    result.errors = [{
                            msg: "User already exists",
                        }];
                reject(result);
            }
    
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(userPayload.password, salt);
    
            // Build user object based on TUser
            const userFields: TUser = {
                email: userPayload.email,
                password: hashed,
            };
    
            user = new User(userFields);
    
            await user.save();
    
            const payload: TUser & {userId: string} = {
                userId: user.id,
                email: userPayload.email
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: config.get("jwtExpiration") },
                (err, token) => {
                    if (err) throw err;
                    result.token = token;

                    result = Object.assign({}, result, {email: userPayload.email, token});
                    resolve(result);
                }
            );
        } catch (err) {
            console.error(err.message);
            reject({ token: '', email: '', message: err.message || "Server Error", errors: err});
        }
    });
};