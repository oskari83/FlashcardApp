"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    passwordHash: String,
    createdCollections: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'CollectionM'
        }
    ],
    savedCollections: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'CollectionM'
        }
    ],
    savedData: [mongoose_1.default.Schema.Types.Mixed],
    createdData: [mongoose_1.default.Schema.Types.Mixed],
});
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
        delete returnedObject.email;
    }
});
const User = mongoose_1.default.model('User', userSchema);
module.exports = User;
