"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
const User = require('../models/user');
const CollectionM = require('../models/collection');
//const helper = require('../utils/helper');
usersRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const existingUser = yield User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        });
    }
    const existingUser2 = yield User.findOne({ email });
    if (existingUser2) {
        return res.status(400).json({
            error: 'email must be unique'
        });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt.hash(password, saltRounds);
    const user = new User({
        username,
        email,
        passwordHash,
    });
    const savedUser = yield user.save();
    res.status(201).json(savedUser);
}));
usersRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User
        .find({})
        .populate('createdCollections', { name: 1, creator: 1, itemCount: 1, items: 1, id: 1 });
    const hideStuffUsers = users.map((us) => {
        const newUS = {
            username: us.username,
            createdCollections: us.createdCollections,
            id: us.id
        };
        return newUS;
    });
    res.json(hideStuffUsers);
}));
usersRouter.get('/:id/collections', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid (you need to be signed in)' });
    }
    const userToGet = yield User
        .findById(req.params.id)
        .populate('createdCollections', { name: 1, creator: 1, itemCount: 1, id: 1 })
        .populate('savedCollections', { name: 1, creator: 1, itemCount: 1, id: 1 });
    if (!userToGet) {
        return res.status(404).json({
            error: 'could not find user'
        });
    }
    if (userToGet._id.toString() !== req.user.id) {
        return res.status(401).json({
            error: 'incorrect credentials'
        });
    }
    const onlyReturnDataObject = {
        createdCollections: userToGet.createdCollections,
        savedCollections: userToGet.savedCollections
    };
    res.json(onlyReturnDataObject);
}));
usersRouter.put('/:id/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid (you need to be signed in)' });
    }
    const userToGet = yield User.findById(req.params.id);
    if (!userToGet) {
        return res.status(404).json({
            error: 'could not find user'
        });
    }
    if (userToGet._id.toString() !== req.user.id) {
        return res.status(401).json({
            error: 'incorrect credentials'
        });
    }
    const colId = req.body.colId;
    const savedColD = userToGet.savedData;
    const realSavedColD = savedColD.map((itm) => {
        return Object.assign(Object.assign({}, itm), { created: false });
    });
    const createdColD = userToGet.createdData;
    const realCreatedColD = createdColD.map((itm) => {
        return Object.assign(Object.assign({}, itm), { created: true });
    });
    const allCols = realSavedColD.concat(realCreatedColD);
    let wantedCol = null;
    for (let i = 0; i < allCols.length; i++) {
        if (allCols[i].id.toString() === colId) {
            wantedCol = allCols[i];
        }
    }
    //check if the collection found has actually been updated and update data i.e. add keys and unique ids
    //will have to check if this actually works later so for now just a test
    const wantedColFromDatabase = yield CollectionM.findById(colId);
    const wantedColItems = wantedColFromDatabase.items;
    let mergedUpdatedCol;
    if (wantedCol) {
        mergedUpdatedCol = wantedColItems.map((t1) => {
            const newO = Object.assign({ uniqueId: t1.uniqueId, correct: t1.correct, attempts: t1.attempts }, wantedCol === null || wantedCol === void 0 ? void 0 : wantedCol.data.find((t2) => t2.uniqueId === t1.uniqueId));
            const modO = Object.assign(Object.assign({}, newO), { key: t1.key });
            return modO;
        });
    }
    else {
        mergedUpdatedCol = wantedColItems.map((t1) => {
            const nwD = {
                uniqueId: t1.uniqueId,
                correct: t1.correct,
                attempts: t1.attempts,
                key: t1.key
            };
            return nwD;
        });
    }
    const dataIWantToSave = {
        data: mergedUpdatedCol,
        id: colId
    };
    if (wantedCol) {
        if (wantedCol.created) {
            for (let i = 0; i < createdColD.length; i++) {
                if (createdColD[i].id.toString() === colId) {
                    createdColD[i] = dataIWantToSave;
                }
            }
        }
        else {
            for (let i = 0; i < savedColD.length; i++) {
                if (savedColD[i].id.toString() === colId) {
                    savedColD[i] = dataIWantToSave;
                }
            }
        }
        userToGet.createdData = createdColD;
        userToGet.savedData = savedColD;
    }
    else {
        userToGet.savedCollections = userToGet.savedCollections.concat(colId);
        userToGet.savedData = userToGet.savedData.concat(dataIWantToSave);
    }
    yield userToGet.save();
    const onlyReturnDataObject = {
        data: mergedUpdatedCol
    };
    res.json(onlyReturnDataObject);
}));
usersRouter.put('/:id/updateown', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to save collections)' });
    }
    const userToUpdate = yield User.findById(req.params.id);
    if (!userToUpdate) {
        return res.status(404).json({
            error: 'could not find user to update'
        });
    }
    if (userToUpdate._id.toString() !== req.user.id) {
        return res.status(401).json({
            error: 'incorrect credentials'
        });
    }
    const colId = req.body.colId;
    const createdApp = userToUpdate.createdData;
    let colToChange;
    for (let i = 0; i < createdApp.length; i++) {
        if (createdApp[i].id.toString() === colId) {
            colToChange = createdApp[i];
        }
    }
    const items = colToChange.data;
    const uniqId = req.body.uniqueId;
    const operation = Number(req.body.operation);
    for (let i = 0; i < items.length; i++) {
        if (items[i].uniqueId.toString() === uniqId) {
            if (operation === 0) {
                if (items[i].correct !== 0) {
                    items[i].correct = items[i].correct - 1;
                }
            }
            else if (operation === 2 && items[i].correct < 4) {
                items[i].correct = items[i].correct + 1;
            }
            items[i].attempts = items[i].attempts + 1;
        }
    }
    const newCol = {
        id: colToChange.id,
        data: items,
    };
    for (let i = 0; i < createdApp.length; i++) {
        if (createdApp[i].id.toString() === colId) {
            createdApp[i] = newCol;
        }
    }
    const newUser = Object.assign(Object.assign({}, userToUpdate), { createdData: createdApp });
    const savedUser = yield User.findByIdAndUpdate(req.params.id, newUser, { new: true });
    res.json(savedUser);
}));
usersRouter.put('/:id/updatesaved', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to save collections)' });
    }
    const userToUpdate = yield User.findById(req.params.id);
    if (!userToUpdate) {
        return res.status(404).json({
            error: 'could not find user to update'
        });
    }
    if (userToUpdate._id.toString() !== req.user.id) {
        return res.status(401).json({
            error: 'incorrect credentials'
        });
    }
    const colId = req.body.colId;
    const savedApp = userToUpdate.savedData;
    let colToChange;
    for (let i = 0; i < savedApp.length; i++) {
        if (savedApp[i].id.toString() === colId) {
            colToChange = savedApp[i];
        }
    }
    const items = colToChange.data;
    const uniqId = req.body.uniqueId;
    const operation = Number(req.body.operation);
    for (let i = 0; i < items.length; i++) {
        if (items[i].uniqueId.toString() === uniqId) {
            if (operation === 0) {
                if (items[i].correct !== 0) {
                    items[i].correct = items[i].correct - 1;
                }
            }
            else if (operation === 2 && items[i].correct < 4) {
                items[i].correct = items[i].correct + 1;
            }
            items[i].attempts = items[i].attempts + 1;
        }
    }
    const newCol = {
        id: colToChange.id,
        data: items,
    };
    for (let i = 0; i < savedApp.length; i++) {
        if (savedApp[i].id.toString() === colId) {
            savedApp[i] = newCol;
        }
    }
    const newUser = Object.assign(Object.assign({}, userToUpdate), { savedData: savedApp });
    const savedUser = yield User.findByIdAndUpdate(req.params.id, newUser, { new: true });
    res.json(savedUser);
}));
usersRouter.post('/checkusername', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const existingUser = yield User.findOne({ username });
    if (existingUser) {
        return res.status(200).json({
            answer: 'fail'
        });
    }
    else {
        return res.status(200).json({
            answer: 'ok'
        });
    }
}));
usersRouter.post('/checkemail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existingUser = yield User.findOne({ email });
    if (existingUser) {
        return res.status(200).json({
            answer: 'fail'
        });
    }
    else {
        return res.status(200).json({
            answer: 'ok'
        });
    }
}));
module.exports = usersRouter;
