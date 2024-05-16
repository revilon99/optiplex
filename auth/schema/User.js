/*
Filename:
  optiplex/auth/schema/User.js
Description:
  Structure of User data in optiplex database
  Note: this is for the auth server ONLY

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/


import { Schema, model } from "mongoose";

const userSchema=Schema({
      email:String,
      password:String,
})
const User=model("user",userSchema);
export default User;
