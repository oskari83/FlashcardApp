/* eslint-disable @typescript-eslint/no-var-requires */
import collectionEntries from '../../data/collections';
const CollectionM = require('../models/collection');

import { NewCollectionEntry, CollectionEntry, MongooseCollectionEntry } from '../types';

const getEntries = (): any | void => {
	CollectionM.find({})
		.then((cols: any) => {
			console.log(cols);
			return cols;
		})
		.catch((error:ErrorCallback) => {
			console.log(error);
		});
};

const addCollection = ( entry: NewCollectionEntry): CollectionEntry | void => {
	const newCollectionEntry = new CollectionM({
		...entry
	});
	newCollectionEntry.save()
		.then((savedCol:MongooseCollectionEntry) => {
			return savedCol;
		})
		.catch((error:ErrorCallback) => {
			console.log(error);
			throw new Error('Could not save collection to mongodb');
		});
};

const findById = (id: number): CollectionEntry | undefined => {
	const entry = collectionEntries.find(d => d.id === id);
	return entry;
};

const deleteById = (id: number): CollectionEntry | undefined => {
	let deletedCollection;
	for(let i=0;i<collectionEntries.length;i++){
		if(collectionEntries[i].id===id){
			deletedCollection = collectionEntries[i];
			collectionEntries.splice(i,1);
			break;
		}
	}
	return deletedCollection;
};

export default {
	getEntries,
	addCollection,
	findById,
	deleteById
};