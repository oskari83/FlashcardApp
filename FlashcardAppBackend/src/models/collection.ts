/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
	name: String,
	creator: String,
	itemCount: Number,
	items: Array,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

collectionSchema.set('toJSON', {
	transform: (_document:any, returnedObject:any) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('CollectionM', collectionSchema);