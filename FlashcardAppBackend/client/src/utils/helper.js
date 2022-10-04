"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseTextField = (txt) => {
    if (!txt || !isString(txt)) {
        throw new Error('Incorrect or missing text field');
    }
    return txt;
};
const isItemEntry = (itm) => {
    return itm instanceof Array;
};
const parseItemsField = (items) => {
    if (!items || !isItemEntry(items)) {
        throw new Error('Incorrect or missing items field');
    }
    return items;
};
const toNewCollectionEntry = ({ name, creator, items }) => {
    const newEntry = {
        name: parseTextField(name),
        creator: parseTextField(creator),
        items: parseItemsField(items)
    };
    return newEntry;
};
const toUpdatedCollectionEntry = ({ name, items }) => {
    let newEntry;
    if (name) {
        newEntry = {
            name: parseTextField(name),
            items: parseItemsField(items)
        };
    }
    else {
        newEntry = {
            items: parseItemsField(items)
        };
    }
    return newEntry;
};
const generateID = () => {
    let result = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 12; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
module.exports = {
    toNewCollectionEntry,
    toUpdatedCollectionEntry,
    generateID
};
