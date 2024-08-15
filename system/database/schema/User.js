/*
Filename:
  optiplex/system/database/schema/User.js
Description:
  Structure of User data in optiplex database

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/


import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: String,
    pp: String,
    id: String
});

const User = model("User", userSchema);

export default User;
