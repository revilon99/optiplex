/*
Filename:
  optiplex/portal/schema/UserAccess.js
Description:
  Structure of UserAccess data for portal

Project:
  portal #0000 (portal.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { Schema, model } from "mongoose";

const accessSchema = Schema({
  id: String,
  access: {
    type: String,
    enum: ['user', 'superuser', 'admin'],
    default: 'user'
  }
});
const Access = model("access", accessSchema);
export default Access;
