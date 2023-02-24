/* eslint-disable @typescript-eslint/no-unused-vars */
const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('express-async-errors');

const collectionRouter = require('./routes/collections');
const usersRouter = require('./routes/users');
const loginRouter2 = require('./routes/login');

const { unknownEndpoint, errorHandler, userExtractor } = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error: Error) => {
		logger.info('error connecting to MongoDB:', error.message);
	});

sgMail.setApiKey(config.SENDGRID_API_KEY);

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/collections', userExtractor, collectionRouter);
app.use('/api/users', userExtractor, usersRouter);
app.use('/api/login', loginRouter2);

app.use(express.static(path.join(__dirname, 'build')));

//app.use(unknownEndpoint);
app.use(errorHandler);

app.get('*', (_req:any, res:any) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;