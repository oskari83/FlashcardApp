/* eslint-disable @typescript-eslint/no-unused-vars */
const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');

const collectionRouter = require('./routes/collections');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
	.then((_res: unknown) => {
		console.log('connected to MongoDB');
	})
	.catch((error: Error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/collections', collectionRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;