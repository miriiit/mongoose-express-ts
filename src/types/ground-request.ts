import { Request } from "express";

type GroundPayload = { name: string, gameType: string, width: number, height: number, coordinates: [number, number] };
type GroundRequest = Request & GroundPayload;

export default GroundRequest;