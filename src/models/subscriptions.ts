import { Document, model, Schema } from "mongoose";
import { TSubscription } from "subscription";

export interface ISubscription extends TSubscription, Document {}

const subscriptionSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  startDT: {
    type: Date,
  },
  endDT: {
    type: Date,
  }
});
// default: Date.now,

/**
 * Mongoose Model based on TUser for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TUser
 * @param email:string
 * @param contact:string
 * @param startDT:string
 * @param endDT:string
 * @param charges:string
 * @param status:  'CONSUMED' | 'AVAILABLE' | 'EXPIRED' | 'SUBSCRIBED'
 */

export const User = model<ISubscription>("Subscription", subscriptionSchema);
