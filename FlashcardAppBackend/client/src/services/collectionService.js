"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const collections_1 = __importDefault(require("../../data/collections"));
const CollectionM = require('../models/collection');
const getEntries = () => {
    CollectionM.find({})
        .then((cols) => {
        console.log(cols);
        return cols;
    })
        .catch((error) => {
        console.log(error);
    });
};
const addCollection = (entry) => {
    const newCollectionEntry = new CollectionM(Object.assign({}, entry));
    newCollectionEntry.save()
        .then((savedCol) => {
        return savedCol;
    })
        .catch((error) => {
        console.log(error);
        throw new Error('Could not save collection to mongodb');
    });
};
const findById = (id) => {
    const entry = collections_1.default.find(d => d.id === id);
    return entry;
};
const deleteById = (id) => {
    let deletedCollection;
    for (let i = 0; i < collections_1.default.length; i++) {
        if (collections_1.default[i].id === id) {
            deletedCollection = collections_1.default[i];
            collections_1.default.splice(i, 1);
            break;
        }
    }
    return deletedCollection;
};
exports.default = {
    getEntries,
    addCollection,
    findById,
    deleteById
};
