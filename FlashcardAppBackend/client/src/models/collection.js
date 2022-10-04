"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const collectionSchema = new mongoose_1.default.Schema({
    name: String,
    creator: String,
    itemCount: Number,
    items: Array,
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});
collectionSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = mongoose_1.default.model('CollectionM', collectionSchema);
