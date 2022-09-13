import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	passwordHash: String,
	createdCollections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CollectionM'
		}
	],
	savedCollectionsApp: [mongoose.Schema.Types.Mixed],
	createdCollectionsApp: [mongoose.Schema.Types.Mixed],
});

userSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
		delete returnedObject.email;
		delete returnedObject.savedCollectionsApp;
		delete returnedObject.createdCollectionsApp;
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;