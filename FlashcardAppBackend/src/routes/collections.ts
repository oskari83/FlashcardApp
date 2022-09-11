import express from 'express';
import toNewCollectionEntry from '../utils';
import { MongooseCollectionEntry } from '../types';
import { nextTick } from 'process';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CollectionM = require('../models/collection');

const router = express.Router();

router.get('/', (_req, res) => {
	CollectionM.find({})
		.then((cols: any) => {
			res.json(cols);
		});
});

router.get('/:id', (req, res) => {
	CollectionM.findById(req.params.id)
		.then((col:MongooseCollectionEntry) => {
			res.json(col);
		})
		.catch((error: ErrorCallback) => nextTick(error));
});

router.post('/', (req, res, next) => {
	try {
		const newColEntry = toNewCollectionEntry(req.body);
		const newCollectionEntry = new CollectionM({
			...newColEntry
		});
		newCollectionEntry.save()
			.then((savedCol:MongooseCollectionEntry) => {
				res.json(savedCol);
			})
			.catch((error:unknown) => next(error));
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.delete('/:id', (req, res, next) => {
	CollectionM.findByIdAndRemove(req.params.id)
		.then((_result:any) => {
			res.status(204).end();
		})
		.catch((error: unknown) => next(error));
});

router.put('/:id', (req, res, next) => {
	const body = req.body;

	const col = {
		itemCount: body.itemCount,
		items: body.items,
	};

	CollectionM.findByIdAndUpdate(req.params.id, col, { new: true })
		.then((updatedCol:MongooseCollectionEntry) => {
			res.json(updatedCol);
		})
		.catch((error:unknown) => next(error));
});

export default router;