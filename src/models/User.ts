import { Document, model, Schema } from "mongoose";
import { TSubscription } from "subscription";

/**
 * Type to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */



export type TUser = {
  email: string;
  password?: string;
};

/**
 * Mongoose Document based on TUser for TypeScript.
 * https://mongoosejs.com/docs/documents.html
 *
 * TUser
 * @param email:string
 * @param password:string
 * @param avatar:string
 */

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  subscriptions: {
    type: Object,
  }
});

/**
 * Mongoose Model based on TUser for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TUser
 * @param email:string
 * @param password:string
 * @param avatar:string
 */

export const User = model<IUser>("User", userSchema);
