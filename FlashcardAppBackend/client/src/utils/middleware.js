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
/* eslint-disable @typescript-eslint/no-explicit-any */
const logger2 = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const requestLogger = (request, _response, next) => {
    logger2.info('Method:', request.method);
    logger2.info('Path:  ', request.path);
    logger2.info('Body:  ', request.body);
    logger2.info('---');
    next();
};
const unknownEndpoint = (_req, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _request, response, next) => {
    logger2.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        });
    }
    next(error);
};
const userExtractor = (request, _response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = yield request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET);
        if (decodedToken) {
            request.user = yield User.findById(decodedToken.id);
        }
    }
    next();
});
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractor
};
