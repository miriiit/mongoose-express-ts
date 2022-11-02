


export type TSubscriptionStatus = 'CONSUMED' | 'AVAILABLE' | 'EXPIRED';

export type TSubscription = { 
    contact: string,
    startDT: string,
    endDT: string,
    charges: number,
    status: TSubscriptionStatus
}