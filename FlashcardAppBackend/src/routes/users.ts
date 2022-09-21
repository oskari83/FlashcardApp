const bcrypt = require('bcryptjs');
import express from 'express';
const usersRouter = express.Router();
const User = require('../models/user');
const CollectionM = require('../models/collection');
import { UserRaw, ItemEntry, DataEntry } from '../types';
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

usersRouter.get('/:id/collections', async (req:any,res:express.Response) => {
	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in)' });
	}

	const userToGet = await User
		.findById(req.params.id)
		.populate('createdCollections', { name:1,creator:1,itemCount:1,id:1 })
		.populate('savedCollections', { name:1,creator:1,itemCount:1,id:1 });
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
	const onlyReturnDataObject = {
		createdCollections: userToGet.createdCollections,
		savedCollections: userToGet.savedCollections
	};

	res.json(onlyReturnDataObject);
});

usersRouter.put('/:id/data', async (req:any,res:express.Response) => {
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
	const colId = req.body.colId;
	const savedColD = userToGet.savedData;
	const realSavedColD = savedColD.map((itm:DataEntry) => {
		return { ...itm, created: false };
	});
	const createdColD = userToGet.createdData;
	const realCreatedColD = createdColD.map((itm:DataEntry) => {
		return { ...itm, created: true };
	});

	const allCols = realSavedColD.concat(realCreatedColD);
	let wantedCol: DataEntry | null = null;
	for(let i=0;i<allCols.length;i++){
		if(allCols[i].id.toString()===colId){
			wantedCol = allCols[i];
		}
	}

	//check if the collection found has actually been updated and update data i.e. add keys and unique ids
	//will have to check if this actually works later so for now just a test
	const wantedColFromDatabase = await CollectionM.findById(colId);
	const wantedColItems = wantedColFromDatabase.items;
	let mergedUpdatedCol;

	if(wantedCol){
		mergedUpdatedCol = wantedColItems.map((t1:ItemEntry) => {
			const newO = {
				uniqueId: t1.uniqueId,
				correct: t1.correct,
				attempts: t1.attempts,
				...wantedCol?.data.find((t2) => t2.uniqueId === t1.uniqueId) };
			const modO = { ...newO, key: t1.key };
			return modO;
		});
	}else{
		mergedUpdatedCol = wantedColItems.map((t1:ItemEntry) => {
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

	if(wantedCol){
		if(wantedCol.created){
			for(let i=0;i<createdColD.length;i++){
				if(createdColD[i].id.toString()===colId){
					createdColD[i] = dataIWantToSave;
				}
			}
		}else{
			for(let i=0;i<savedColD.length;i++){
				if(savedColD[i].id.toString()===colId){
					savedColD[i] = dataIWantToSave;
				}
			}
		}

		userToGet.createdData = createdColD;
		userToGet.savedData = savedColD;
	}else{
		userToGet.savedCollections = userToGet.savedCollections.concat(colId);
		userToGet.savedData = userToGet.savedData.concat(dataIWantToSave);
	}

	await userToGet.save();
	const onlyReturnDataObject = {
		data: mergedUpdatedCol
	};

	res.json(onlyReturnDataObject);
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
	const createdApp = userToUpdate.createdData;
	let colToChange;

	for(let i=0;i<createdApp.length;i++){
		if(createdApp[i].id.toString()===colId){
			colToChange = createdApp[i];
		}
	}

	const items = colToChange.data;

	const uniqId = req.body.uniqueId;
	const operation = Number(req.body.operation);

	for(let i=0;i<items.length;i++){
		if(items[i].uniqueId.toString()===uniqId){
			if(operation===0){
				if(items[i].correct!==0){
					items[i].correct = items[i].correct-1;
				}
			}else if(operation===2){
				items[i].correct = items[i].correct+1;
			}
			items[i].attempts = items[i].attempts+1;
		}
	}

	const newCol = {
		id: colToChange.id,
		data: items,
	};

	for(let i=0;i<createdApp.length;i++){
		if(createdApp[i].id.toString()===colId){
			createdApp[i] = newCol;
		}
	}

	const newUser = {
		...userToUpdate,
		createdData: createdApp
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
	const savedApp = userToUpdate.savedData;
	let colToChange;

	for(let i=0;i<savedApp.length;i++){
		if(savedApp[i].id.toString()===colId){
			colToChange = savedApp[i];
		}
	}

	const items = colToChange.data;

	const uniqId = req.body.uniqueId;
	const operation = Number(req.body.operation);

	for(let i=0;i<items.length;i++){
		if(items[i].uniqueId.toString()===uniqId){
			if(operation===0){
				if(items[i].correct!==0){
					items[i].correct = items[i].correct-1;
				}
			}else if(operation===2){
				items[i].correct = items[i].correct+1;
			}
			items[i].attempts = items[i].attempts+1;
		}
	}

	const newCol = {
		id: colToChange.id,
		data: items,
	};

	for(let i=0;i<savedApp.length;i++){
		if(savedApp[i].id.toString()===colId){
			savedApp[i] = newCol;
		}
	}

	const newUser = {
		...userToUpdate,
		savedData: savedApp
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