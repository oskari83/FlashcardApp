import express from 'express';
import { CollectionEntry, ItemEntry } from '../types';
const helper = require('../utils/helper');
const CollectionM = require('../models/collection');

const router = express.Router();

router.get('/', async (_req:express.Request, res:express.Response) => {
	const cols = await CollectionM
		.find({})
		.populate('user', { username: 1 });
	res.json(cols);
});

router.get('/:id', async (req:express.Request, res:express.Response) => {
	const fcol = await CollectionM.findById(req.params.id);
	if (fcol) {
		res.json(fcol);
	} else {
		res.status(404).end();
	}
});

router.post('/', async (req:any, res:express.Response) => {
	try {
		if(!req.user){
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		const newColEntry = helper.toNewCollectionEntry(req.body);
		const user = req.user;

		const oldItems = newColEntry.items;
		const newItems = oldItems.map((itemEnt:ItemEntry) => {
			itemEnt.correct = 0;
			itemEnt.key = helper.generateID();
			return itemEnt;
		});

		const newCollectionEntry = new CollectionM({
			...newColEntry,
			items: newItems,
			itemCount: newItems.length,
			user: user.id
		});

		const savedCol = await newCollectionEntry.save();

		user.createdCollections = user.createdCollections.concat(savedCol._id);

		const addCreatedCol = {
			...newColEntry,
			id: savedCol._id
		};

		user.createdCollectionsApp = user.createdCollectionsApp.concat(addCreatedCol);
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

router.delete('/:id', async (req:any, res:express.Response) => {
	const collectionToDelete = await CollectionM.findById(req.params.id);
	if(!collectionToDelete) {
		return res.status(204).end();
	}

	if(collectionToDelete.user && collectionToDelete.user.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'only the creator can delete a collection'
		});
	}

	await CollectionM.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

router.put('/:id', async (req:any, res:express.Response) => {
	const collectionToUpdate = await CollectionM.findById(req.params.id);
	if(!collectionToUpdate) {
		return res.status(404).json({
			error: 'could not find collection to update'
		});
	}

	if(collectionToUpdate.user && collectionToUpdate.user.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'only the creator can update a collection'
		});
	}

	const body = helper.toUpdatedCollectionEntry(req.body);

	const col = {
		name: body.name,
		itemCount: body.items.length,
		items: body.items,
	};

	const updatedCol = await CollectionM.findByIdAndUpdate(req.params.id, col, { new: true });
	res.json(updatedCol);
});

router.put('/:id/update', async (req:any, res:express.Response) => {
	const collectionToUpdate = await CollectionM.findById(req.params.id);
	if(!collectionToUpdate) {
		return res.status(404).json({
			error: 'could not find collection to update'
		});
	}

	if(collectionToUpdate.user && collectionToUpdate.user.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'only the creator can update a collection'
		});
	}

	const body = helper.toUpdatedCollectionEntry(req.body);
	const items = body.items;
	const key = req.key;
	const value = req.value;
	for(let i=0;i<items.length;i++){
		if(items[i].key===key){
			items[i].correct = value;
		}
	}

	const col = {
		name: body.name,
		itemCount: body.items.length,
		items: items,
	};

	const updatedCol = await CollectionM.findByIdAndUpdate(req.params.id, col, { new: true });
	res.json(updatedCol);
});

router.put('/:id/save', async (req:any, res:express.Response) => {
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

	const addSavedCol = {
		creator: collectionToSave.creator,
		name: collectionToSave.name,
		itemCount: collectionToSave.itemCount,
		items: collectionToSave.items,
		id: req.params.id
	};

	const user = req.user;
	user.savedCollectionsApp = user.savedCollectionsApp.concat(addSavedCol);
	await user.save();

	res.json(collectionToSave);
});

router.put('/:id/unsave', async (req:any, res:express.Response) => {
	if(!req.user){
		return res.status(401).json({ error: 'token missing or invalid (you need to be signed in to save collections)' });
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
	const savedCols = user.savedCollectionsApp;
	const newSavedCols = savedCols.filter((col:CollectionEntry) => {
		return col.id!==req.params.id;
	});

	user.savedCollectionsApp = newSavedCols;
	await user.save();

	res.status(204).end();
});

module.exports = router;