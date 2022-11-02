import { TSubscriptionStatus } from "subscription"

export type TSlots = { 
    contact?: string,
    email?: string,
    slotName: string,
    startDT: string,
    endDT: string,
    charges: number,
    status: TSubscriptionStatus
}