// External modules
import mongoose, { Schema, Model } from "mongoose";

// Generics
import { MongooseDocument as Document } from "../../../login/src/shared/generics/mongoose.generics";

export interface IUser {
    email: string;
    password: string;
}

const schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false,
    }
}, { timestamps: true, validateBeforeSave: true });

export const UserModel = mongoose.model<IUser>("User", schema);
export type UserDocument = Document<IUser>