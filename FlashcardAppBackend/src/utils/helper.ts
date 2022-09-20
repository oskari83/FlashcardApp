import { NewCollectionEntry2, ItemEntry, UpdatedCollectionEntry2 } from '../types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseTextField = (txt: unknown): string => {
	if (!txt || !isString(txt)) {
		throw new Error('Incorrect or missing text field');
	}

	return txt;
};

const isItemEntry = (itm: unknown): itm is ItemEntry[] => {
	return itm instanceof Array;
};

const parseItemsField = (items: unknown): ItemEntry[] => {
	if (!items || !isItemEntry(items)) {
		throw new Error('Incorrect or missing items field');
	}

	return items;
};

type Fields = { name?: unknown, creator?: unknown, itemCount: unknown, items: unknown };

const toNewCollectionEntry = ({ name, creator, items }: Fields): NewCollectionEntry2 => {
	const newEntry: NewCollectionEntry2 = {
		name: parseTextField(name),
		creator: parseTextField(creator),
		items: parseItemsField(items)
	};

	return newEntry;
};

const toUpdatedCollectionEntry = ({ name, items }: Fields): UpdatedCollectionEntry2 => {
	let newEntry:UpdatedCollectionEntry2;
	if(name){
		newEntry = {
			name: parseTextField(name),
			items: parseItemsField(items)
		};
	}else{
		newEntry = {
			items: parseItemsField(items)
		};
	}

	return newEntry;
};

const generateID = () => {
	let result = '';
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = 12; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

module.exports = {
	toNewCollectionEntry,
	toUpdatedCollectionEntry,
	generateID
};