const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import express from 'express';
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request:express.Request, response:express.Response) => {
	const { email, password } = request.body;

	const user = await User.findOne({ email });
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid email or password'
		});
	}

	console.log(user);
	console.log('loggin in');

	const userForToken = {
		email: user.email,
		id: user._id,
	};

	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		{ expiresIn: 60*60 }
	);

	response
		.status(200)
		.send({ token, username: user.username, email: user.email });
});

module.exports = loginRouter;