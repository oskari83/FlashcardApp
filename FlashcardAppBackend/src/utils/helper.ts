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

//generates a random 12 digit ID based on given chars
const generateID = () => {
	let result = '';
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = 12; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

//generates a random 6 digit key based on given chars
const generateKey = () => {
	let result = '';
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

const generateHTML = (key:string, email:string) => {
	return(`
	<div style="width:100%;">
		<div style="width: 80%; margin: auto; margin-top:40px; margin-bottom: 20px; font-family:Verdana, Geneva, Tahoma, sans-serif; font-size: 20px; color: rgb(31,48,76)">
			<strong>Reset your password by clicking the link below</strong>
		</div>

		<div style="width: 80%; height: 1px; background-color: rgba(106,115,137,0.5); margin: auto;"></div>

		<div style="width: 80%; height: 70px; padding-top: 20px; display:flex; margin-top:30px; margin-bottom: 30px; align-items: center; justify-content: flex-start; font-family:Verdana, Geneva, Tahoma, sans-serif; font-size: 12px; color: rgb(106,115,137); text-align: justify; margin: auto;">
			If you meant to reset your password, you can do this by clicking the link below within 1 hour of this email being sent. If you did not request a password reset, please ignore this email.
		</div>

		<div href="www.google.com" style="width: 80%; height: 80px; padding-top: 20px; padding-bottom: 10px; font-family:Verdana, Geneva, Tahoma, sans-serif; font-size: clamp(8px, 2.5vw, 12px); color: white; margin: auto;">
			<div style="width: 40%; height: 50px; background-color: rgb(47, 110, 255); color: white; margin: auto;">
				<a style="display: block; width: 90%; height: 50px; color: white; text-decoration: none; text-align: center; padding-top: 16px; margin: auto;" href="https://www.memnotes.io/reset/?key=${key}&email=${email}"><strong>RESET PASSWORD</strong></a>
			</div>
		</div>

		<div style="width: 80%; height: 20px; background-color: rgba(106,115,137,0); margin: auto;">
			<div style="width: 100%; height: 1px; background-color: rgba(106,115,137,0.5); margin: auto;"></div>
		</div>

		<div style="width: 80%; height: 20px; padding-top: 15px; font-family:Verdana, Geneva, Tahoma, sans-serif; font-size: 12px; color: rgb(106,115,137); margin: auto;">
			<div style="margin: auto; width: 200px; height: 100%; text-align: center;">MemNotes Support</div>
		</div>
		<div style="width: 80%; height: 20px; font-family:Verdana, Geneva, Tahoma, sans-serif; font-size: 12px; color: rgb(106,115,137); margin: auto;">
			<div style="margin: auto; width: 200px; height: 100%; text-align: center;">Cambridge, United Kingdom</div>
		</div>
	</div>
	`);
};

const lessThanOneHourAgo = (date:any) => {
	const HOUR = 1000 * 60 * 60;
	const anHourAgo = Date.now() - HOUR;

	return date > anHourAgo;
};

module.exports = {
	toNewCollectionEntry,
	toUpdatedCollectionEntry,
	generateID,
	generateKey,
	generateHTML,
	lessThanOneHourAgo
};