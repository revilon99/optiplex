/*
Filename:
  optiplex/auth/database/db.js
Description:
  This file handles connection to mongoDB database
  defined in .env

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
const mongoose = require("mongoose");
const env = require("dotenv");

// Load .env parameters
env.config();

// connect to database
const dbconnection = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};

// return database
module.exports = dbconnection;
