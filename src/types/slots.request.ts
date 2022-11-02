import { Request } from "express";
import { TSlots } from "slots";

type payload = {groundName: string};

type SlotsRequest = Request & TSlots & payload;

export default SlotsRequest;