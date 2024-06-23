/*
Filename:
  optiplex/portal/database/db.js
Description:
  This file handles connection to mongoDB database
  defined in .env

Project:
  portal #0000 (portal.oli.casa) 

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
  connect(process.env.MONGODB_URL + "portal")
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};

export default dbconnection;
