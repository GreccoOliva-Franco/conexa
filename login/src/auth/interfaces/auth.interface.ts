// External modules
import { Types } from "mongoose";

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface AuthTokenPayload {
    _id: Types.ObjectId | string;
    email: string;
}

export type AuthToken = string;