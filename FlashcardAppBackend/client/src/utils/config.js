"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const PORT = process.env.PORT || 3004;
const MONGODB_URI = process.env.MONGODB_URI || 'null';
module.exports = {
    MONGODB_URI,
    PORT,
};
