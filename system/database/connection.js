/*
Filename:
  optiplex/system/database/connection.js
Description:
  This file handles connection to mongoDB database
  defined in .env

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { connect } from "mongoose";
import { config } from "dotenv";

// Load .env parameters
config();

// connect to database
const dbconnection = async () => {
  connect(process.env.MONGODB_URL + process.env.DB_PREFIX + "-" + "system")
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};

export default dbconnection;
