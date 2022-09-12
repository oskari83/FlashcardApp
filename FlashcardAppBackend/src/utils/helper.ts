import { NewCollectionEntry, ItemEntry, UpdatedCollectionEntry } from '../types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseTextField = (txt: unknown): string => {
	if (!txt || !isString(txt)) {
		throw new Error('Incorrect or missing text field');
	}

	return txt;
};

const isNumber = (num: unknown): num is number => {
	return typeof num === 'number' || num instanceof Number;
};

const parseNumberField = (num: unknown): number => {
	if (!num || !isNumber(num)) {
		throw new Error('Incorrect or missing number field');
	}

	return num;
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

const toNewCollectionEntry = ({ name, creator, itemCount, items }: Fields): NewCollectionEntry => {
	const newEntry: NewCollectionEntry = {
		name: parseTextField(name),
		creator: parseTextField(creator),
		itemCount: parseNumberField(itemCount),
		items: parseItemsField(items)
	};

	return newEntry;
};

const toUpdatedCollectionEntry = ({ itemCount, items }: Fields): UpdatedCollectionEntry => {
	const newEntry: UpdatedCollectionEntry = {
		itemCount: parseNumberField(itemCount),
		items: parseItemsField(items)
	};

	return newEntry;
};

module.exports = {
	toNewCollectionEntry,
	toUpdatedCollectionEntry,
};