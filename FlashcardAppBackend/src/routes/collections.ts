import express from 'express';
const helper = require('../utils/helper');
const CollectionM = require('../models/collection');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

const getTokenFrom = (request:express.Request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

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

router.post('/', async (req:express.Request, res:express.Response) => {
	try {
		const newColEntry = helper.toNewCollectionEntry(req.body);

		const token = getTokenFrom(req);
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if(!decodedToken.id){
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		const user = await User.findById(decodedToken.id);

		const newCollectionEntry = new CollectionM({
			...newColEntry,
			user: user._id
		});

		const savedCol = await newCollectionEntry.save();
		user.createdCollections = user.createdCollections.concat(savedCol._id);
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

router.delete('/:id', async (req:express.Request, res:express.Response) => {
	await CollectionM.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

router.put('/:id', async (req:express.Request, res:express.Response) => {
	const body = helper.toUpdatedCollectionEntry(req.body);

	const col = {
		itemCount: body.itemCount,
		items: body.items,
	};

	const updatedCol = await CollectionM.findByIdAndUpdate(req.params.id, col, { new: true });
	res.json(updatedCol);
});

module.exports = router;