/*
Filename:
  optiplex/system/database/schema/System.js
Description:
  Structure of System data in optiplex database

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/


import { Schema, model } from "mongoose";

const systemSchema = Schema({
    name: String,
    pp: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User"}]
});

const System = model("System", systemSchema);

export default System;
