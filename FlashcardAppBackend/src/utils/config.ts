/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const PORT = process.env.PORT || 3004;
const MONGODB_URI = process.env.MONGODB_URI || 'null';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

module.exports = {
	MONGODB_URI,
	PORT,
	SENDGRID_API_KEY
};