const bcrypt = require('bcrypt');
import express from 'express';
const usersRouter = express.Router();
const User = require('../models/user');
import { UserRaw } from '../types';
//const helper = require('../utils/helper');

usersRouter.post('/signup', async (req:express.Request, res:express.Response) => {
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
	user.savedCollectionsApp = user.savedCollectionsApp.concat(body.collectionId);
	await user.save();
	res.status(204).end();
});

usersRouter.get('/', async (_req:express.Request,res:express.Response) => {
	const users = await User
		.find({})
		.populate('createdCollections', { name:1,creator:1,itemCount:1,items:1,id:1 });
	const hideStuffUsers = users.map((us:UserRaw) => {
		const newUS = {
			username: us.username,
			createdCollections: us.createdCollections,
			id: us.id
		};
		return newUS;
	});
	res.json(hideStuffUsers);
});

usersRouter.get('/:id/data', async (req:any,res:express.Response) => {
	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in)' });
	}

	const userToGet = await User.findById(req.params.id);
	if(!userToGet) {
		return res.status(404).json({
			error: 'could not find user'
		});
	}
	if(userToGet._id.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'incorrect credentials'
		});
	}
	res.json(userToGet);
});

usersRouter.put('/:id/updateown', async (req:any, res:express.Response) => {
	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to save collections)' });
	}

	const userToUpdate = await User.findById(req.params.id);
	if(!userToUpdate) {
		return res.status(404).json({
			error: 'could not find user to update'
		});
	}

	if(userToUpdate._id.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'incorrect credentials'
		});
	}
	const colId = req.body.colId;
	const createdApp = userToUpdate.createdCollectionsApp;
	let colToChange;

	for(let i=0;i<createdApp.length;i++){
		if(createdApp[i].id.toString()===colId){
			colToChange = createdApp[i];
		}
	}

	const items = colToChange.items;

	const key = req.body.key;
	const value = req.body.value;

	for(let i=0;i<items.length;i++){
		if(items[i].key===key){
			items[i].correct = value;
		}
	}

	const newCol = {
		...colToChange,
		items: items,
	};

	for(let i=0;i<createdApp.length;i++){
		if(createdApp[i].id.toString()===colId){
			createdApp[i] = newCol;
		}
	}

	const newUser = {
		...userToUpdate,
		createdCollectionsApp: createdApp
	};

	const savedUser = await User.findByIdAndUpdate(req.params.id, newUser, { new: true });
	res.json(savedUser);
});

usersRouter.put('/:id/updatesaved', async (req:any, res:express.Response) => {
	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to save collections)' });
	}

	const userToUpdate = await User.findById(req.params.id);
	if(!userToUpdate) {
		return res.status(404).json({
			error: 'could not find user to update'
		});
	}

	if(userToUpdate._id.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'incorrect credentials'
		});
	}
	const colId = req.body.colId;
	const savedApp = userToUpdate.savedCollectionsApp;
	let colToChange;

	for(let i=0;i<savedApp.length;i++){
		if(savedApp[i].id.toString()===colId){
			colToChange = savedApp[i];
		}
	}

	const items = colToChange.items;

	const key = req.body.key;
	const value = req.body.value;

	for(let i=0;i<items.length;i++){
		if(items[i].key===key){
			items[i].correct = value;
		}
	}

	const newCol = {
		...colToChange,
		items: items,
	};

	for(let i=0;i<savedApp.length;i++){
		if(savedApp[i].id.toString()===colId){
			savedApp[i] = newCol;
		}
	}

	const newUser = {
		...userToUpdate,
		savedCollectionsApp: savedApp
	};

	const savedUser = await User.findByIdAndUpdate(req.params.id, newUser, { new: true });
	res.json(savedUser);
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