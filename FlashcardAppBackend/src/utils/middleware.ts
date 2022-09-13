/* eslint-disable @typescript-eslint/no-explicit-any */
const logger2 = require('./logger');
import express from 'express';
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request:express.Request, _response:express.Response, next:express.NextFunction) => {
	logger2.info('Method:', request.method);
	logger2.info('Path:  ', request.path);
	logger2.info('Body:  ', request.body);
	logger2.info('---');
	next();
};

const unknownEndpoint = (_req: express.Request, response: express.Response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: { name: string, message: string}, _request:express.Request, response: express.Response, next:express.NextFunction) => {
	logger2.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		});
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired'
		});
	}

	next(error);
};

const userExtractor = async (request:any, _response:express.Response, next:express.NextFunction) => {
	const authorization = await request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET);
		if(decodedToken){
			request.user = await User.findById(decodedToken.id);
		}
	}

	next();
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	userExtractor
};