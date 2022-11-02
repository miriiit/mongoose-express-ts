import { Document, model, Schema } from "mongoose";
import { TSlots } from "../types/slots";
import EGames from "../enums/TGames";

export type TGround = {
    name: string,
    gameType: EGames,
    width: number,
    height: number,
    coordinates: [number, number];
    slots?: TSlots[];
};

export interface IGround extends TGround, Document { }

const groundSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    gameType: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    coordinates: {
        type: Schema.Types.Mixed,
        default: []
    },
    slots: {
        type: Schema.Types.Mixed,
        default: []
    },
}, { timestamps: true });

groundSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export const Ground = model<IGround>("Ground", groundSchema);

