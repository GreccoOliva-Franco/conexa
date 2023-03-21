// External modules
import mongoose from "mongoose";

export type MongooseDocument<T> = mongoose.Document<unknown, {}, T> & Omit<T & {
    _id: mongoose.Types.ObjectId;
}, never>