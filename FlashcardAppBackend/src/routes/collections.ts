const express = require('express');

import { CollectionEntry, ItemEntry } from '../types';
const helper = require('../utils/helper');
const CollectionM = require('../models/collection');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (_req:any, res:any) => {
	const cols = await CollectionM
		.find()
		.sort({ _id: -1 })
		.limit(25)
		.populate('user', { username: 1 });
	res.json(cols);
});

router.post('/search', async (req:any, res:any) => {
	const query = req.body.search;
	const cols = await CollectionM
		.find({ 'name': { $regex: '^' + query, $options: 'i' } })
		.exec();
	res.json(cols);
});

router.get('/:id', async (req:any, res:any) => {
	const fcol = await CollectionM.findById(req.params.id);
	if (fcol) {
		res.json(fcol);
	} else {
		res.status(404).end();
	}
});

router.post('/', async (req:any, res:any) => {
	try {
		if(!req.user){
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		const newColEntry = helper.toNewCollectionEntry(req.body);
		const user = req.user;

		const newItems = newColEntry.items.map((itemEnt:ItemEntry, index:number) => {
			itemEnt.correct = 0;
			itemEnt.key = index;
			itemEnt.attempts = 0;
			itemEnt.uniqueId = helper.generateID();
			return itemEnt;
		});

		const newCollectionEntry = new CollectionM({
			name: newColEntry.name,
			creator: newColEntry.creator,
			items: newItems,
			itemCount: newItems.length,
			user: user.id
		});

		const savedCol = await newCollectionEntry.save();

		user.createdCollections = user.createdCollections.concat(savedCol._id);

		const newItemsData = newItems.map((itemEnt:ItemEntry, index:number) => {
			const newEntItemData = {
				key: index,
				uniqueId: itemEnt.uniqueId,
				correct: 0,
				attempts: 0,
			};
			return newEntItemData;
		});
		const addCreatedCol = {
			data: newItemsData,
			id: savedCol._id
		};

		user.createdData = user.createdData.concat(addCreatedCol);
		await user.save();

		res.status(201).json(savedCol);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.delete('/:id', async (req:any, res:any) => {
	const collectionToDelete = await CollectionM.findById(req.params.id);
	if(!collectionToDelete) {
		return res.status(204).end();
	}

	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to delete collections)' });
	}

	if(collectionToDelete.user && collectionToDelete.user.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'only the creator can delete a collection'
		});
	}

	const user = req.user;
	const createdData = user.createdData;
	const newCreatedData = createdData.filter((col:CollectionEntry) => {
		return col.id!==req.params.id;
	});

	user.createdData = newCreatedData;
	await user.save();
	await CollectionM.findByIdAndDelete(req.params.id);

	res.status(204).end();
});

router.put('/:id', async (req:any, res:any) => {
	const collectionToUpdate = await CollectionM.findById(req.params.id);
	if(!collectionToUpdate) {
		return res.status(404).json({
			error: 'could not find collection to update'
		});
	}

	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to save collections)' });
	}

	if(collectionToUpdate.user && collectionToUpdate.user.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'only the creator can update a collection'
		});
	}

	const body = helper.toUpdatedCollectionEntry(req.body);

	const newUpdatedItems = body.items.map((itemEnt:ItemEntry, index:number) => {
		if(!itemEnt.correct){
			itemEnt.correct = 0;
		}
		if(!itemEnt.attempts){
			itemEnt.attempts = 0;
		}
		if(!itemEnt.uniqueId){
			itemEnt.uniqueId = helper.generateID();
		}
		itemEnt.key = index;
		return itemEnt;
	});

	const col = {
		name: body.name,
		itemCount: body.items.length,
		items: newUpdatedItems,
	};

	const user = await User.findById(req.user);

	if(!user) {
		return res.status(404).json({
			error: 'could not find author'
		});
	}

	if(user._id.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'incorrect credentials, only the creator can update a collection'
		});
	}

	const colId = req.params.id;
	const createdData = user.createdData;
	let colToChange: any;

	for(let i=0;i<createdData.length;i++){
		if(createdData[i].id.toString()===colId){
			colToChange = createdData[i];
		}
	}

	if(!colToChange){
		return res.status(401).json({
			error: 'collection data not found in user data'
		});
	}

	const mergedUpdatedCol = newUpdatedItems.map((t1:ItemEntry) => {
		const foundData = colToChange?.data.find((t2:any) => t2.uniqueId === t1.uniqueId);
		if(foundData!==undefined){
			return { ...t1, ...foundData };
		}
		return { ...t1 };
	});

	const newItemsData = mergedUpdatedCol.map((itemEnt:ItemEntry, index:number) => {
		const newEntItemData = {
			key: index,
			uniqueId: itemEnt.uniqueId,
			correct: itemEnt.correct,
			attempts: itemEnt.attempts,
		};
		return newEntItemData;
	});

	const newDataCol = {
		data: newItemsData,
		id: colToChange.id,
	};

	for(let i=0;i<createdData.length;i++){
		if(createdData[i].id.toString()===colId){
			createdData[i] = newDataCol;
		}
	}

	user.createdData = createdData;
	await user.save();
	const updatedCol = await CollectionM.findByIdAndUpdate(req.params.id, col, { new: true });
	res.json(updatedCol);
});

router.put('/:id/save', async (req:any, res:any) => {
	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to save collections)' });
	}

	const collectionToSave = await CollectionM.findById(req.params.id);

	if(!collectionToSave) {
		return res.status(404).json({
			error: 'could not find collection to save'
		});
	}

	if(collectionToSave.user && collectionToSave.user.toString() === req.user.id) {
		return res.status(401).json({
			error: 'the creator cant save his own collection'
		});
	}

	const newSavedItems = collectionToSave.items.map((itemEnt:ItemEntry, index:number) => {
		const newEntItemData = {
			key: index,
			uniqueId: itemEnt.uniqueId,
			correct: 0,
			attempts: 0,
		};
		return newEntItemData;
	});

	const addSavedData = {
		data: newSavedItems,
		id: req.params.id
	};

	const user = req.user;
	user.savedCollections = user.savedCollections.concat(req.params.id);
	user.savedData = user.savedData.concat(addSavedData);
	await user.save();

	res.json(collectionToSave);
});

router.put('/:id/unsave', async (req:any, res:any) => {
	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to unsave collections)' });
	}

	const collectionToUnSave = await CollectionM.findById(req.params.id);

	if(!collectionToUnSave) {
		return res.status(404).json({
			error: 'could not find collection to unsave'
		});
	}

	if(collectionToUnSave.user && collectionToUnSave.user.toString() === req.user.id) {
		return res.status(401).json({
			error: 'the creator cant unsave his own collection'
		});
	}

	const user = req.user;
	const savedCols = user.savedCollections;
	const savedData = user.savedData;
	const newSavedCols = savedCols.filter((col:CollectionEntry) => {
		return col.toString()!==req.params.id;
	});
	const newSavedColsData = savedData.filter((col:CollectionEntry) => {
		return col.id!==req.params.id;
	});

	user.savedCollections = newSavedCols;
	user.savedData = newSavedColsData;
	await user.save();

	res.status(204).end();
});

module.exports = router;