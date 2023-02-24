import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	passwordHash: String,
	recoverData: {
		type: Object
	},
	createdCollections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CollectionM'
		}
	],
	savedCollections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CollectionM'
		}
	],
	savedData: [mongoose.Schema.Types.Mixed],
	createdData: [mongoose.Schema.Types.Mixed],
});

userSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
		delete returnedObject.email;
		delete returnedObject.recoverData;
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;