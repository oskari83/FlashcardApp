const bcrypt = require('bcrypt');
import express from 'express';
const usersRouter = express.Router();
const User = require('../models/user');

usersRouter.post('/', async (req:express.Request, res:express.Response) => {
	const { username, email, password } = req.body;

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return res.status(400).json({
			error: 'username must be unique'
		});
	}

	const existingUser2 = await User.findOne({ email });
	if (existingUser2) {
		return res.status(400).json({
			error: 'email must be unique'
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		email,
		passwordHash,
	});

	const savedUser = await user.save();

	res.status(201).json(savedUser);
});

usersRouter.post('/savecollection', async (req: express.Request, res: express.Response) => {
	const body = req.body;
	const user = await User.findById(body.userId);
	user.savedCollections = user.savedCollections.concat(body.collectionId);
	await user.save();
	res.status(204).end();
});

usersRouter.get('/', async (_req:express.Request,res:express.Response) => {
	const users = await User
		.find({})
		.populate('createdCollections', { name:1,creator:1,itemCount:1,items:1,id:1 })
		.populate('savedCollections', { name:1,creator:1,itemCount:1,items:1,id:1 });

	res.json(users);
});

usersRouter.post('/checkusername', async (req:express.Request, res:express.Response) => {
	const { username } = req.body;

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return res.status(200).json({
			answer: 'fail'
		});
	} else {
		return res.status(200).json({
			answer: 'ok'
		});
	}
});

usersRouter.post('/checkemail', async (req:express.Request, res:express.Response) => {
	const { email } = req.body;

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(200).json({
			answer: 'fail'
		});
	} else {
		return res.status(200).json({
			answer: 'ok'
		});
	}
});

module.exports = usersRouter;