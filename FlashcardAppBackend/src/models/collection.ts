import mongoose from 'mongoose';

const url = process.env.MONGODB_URI || 'null';

mongoose.connect(url)
	.then((_result: unknown) => {
		console.log('connected to MongoDB');
	})
	.catch((error: Error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const collectionSchema = new mongoose.Schema({
	name: String,
	creator: String,
	itemCount: Number,
	items: Array,
});


collectionSchema.set('toJSON', {
	transform: (_document:any, returnedObject:any) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('CollectionM', collectionSchema);