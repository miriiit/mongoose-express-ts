import { Router, Response } from "express";
import { Ground, IGround, TGround } from "../models/grounds";
import { check, validationResult, oneOf } from "express-validator";
import HttpStatusCodes from "http-status-codes";

import GroundRequest from "../types/ground-request";
import { getGroundsService } from "../services/ground.service";

import { getPagination } from '../utils';
import PaginatedResponse from "paginated-response";

export const getGrounds = async (req: GroundRequest, res: Response) => {

    let page: number = +req.query.page || 0;
    let size: number = +req.query.size || 25;
    let name: any = req.query.name || "";

    let filters = name
        ? { name: { $regex: new RegExp(name), $options: "i" } }
        : {};


    let result: PaginatedResponse = await getGroundsService({ page, size }, filters);
    try {
        return res.json({ msg: "Grounds Fetched successfully", data: result });
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
            message:
                err.message || "Some error occurred while retrieving grounds.",
        });
    }
};

export const getGroundsByName = async (req: GroundRequest, res: Response) => {
    try {
        const ground: IGround = await Ground.findOne({
            name: req.name,
        }).populate("ground", ["name", "gameType"]);
        if (!ground) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        msg: "There is no ground for this id",
                    },
                ],
            });
        }

        res.json(ground);
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
};

export const saveOrUpdateGround = async (req: GroundRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    const { name, gameType, width, height, coordinates } = req.body;

    // Build Ground object based on TGround
    const groundFields: TGround = {
        name,
        gameType,
        width,
        height,
        coordinates,
    };

    try {
        let ground: IGround = await Ground.findOne({ name });

        if (ground) {
            // Update
            ground = await Ground.findOneAndUpdate(
                { ground: req.name },
                { $set: groundFields },
                { new: true }
            );

            return res.json(ground);
        }

        // Create
        ground = new Ground(groundFields);

        await ground.save();

        res.json(ground);
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }

};