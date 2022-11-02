import { Router, Response } from "express";
import { Ground, IGround, TGround } from "../models/grounds";
import { check, validationResult, oneOf } from "express-validator";
import HttpStatusCodes from "http-status-codes";

import GroundRequest from "../types/ground-request";
import { getGroundsService } from "../services/ground.service";

import { getPagination } from '../utils';
import PaginatedResponse from "paginated-response";
import SlotsRequest from "../types/slots.request";
import { TSlots } from "slots";

export const addSlot = async (req: SlotsRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    const { groundName, slotName, startDT, endDT, charges, status } = req.body;
    let slot = { slotName, startDT, endDT, charges, status: status || 'AVAILABLE' };

    try {
        let ground: IGround = await Ground.findOne({ name: groundName });

        if (!ground) {
            return res
                .status(HttpStatusCodes.NOT_ACCEPTABLE)
                .json({ msg: 'Invalid Ground entry!' });
        }

        if (ground) {

            let slots: TSlots[] = [];
            if (ground.slots) {
                slots = ground.slots;
                let itemExist = slots.find(item => item.slotName == slotName);

                if (itemExist) {
                    slot = { ...itemExist, ...slot };
                    slots = slots.filter(item => item.slotName !== slotName);
                    console.log(slots);
                }
                slots = [...slots, slot];
            } else {
                slots = [slot];
            }

            let retRes = await Ground.findOneAndUpdate(
                { _id: ground.id },
                {
                    $set:
                    {
                        slots: slots
                    }
                });
            return res.json({ msg: 'successfully added.' });
        }
        return res
            .status(HttpStatusCodes.NOT_ACCEPTABLE)
            .json({ msg: 'Something went Wrong!' });
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }

};