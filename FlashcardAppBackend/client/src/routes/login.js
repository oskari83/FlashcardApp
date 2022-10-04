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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const user = yield User.findOne({ email });
    const passwordCorrect = user === null
        ? false
        : yield bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid email or password'
        });
    }
    console.log('loggin in: ', user.username);
    const userForToken = {
        email: user.email,
        id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
    response
        .status(200)
        .send({ token, username: user.username, email: user.email, id: user._id });
}));
module.exports = loginRouter;
