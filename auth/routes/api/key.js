/*
Filename:
  optiplex/auth/controller/key.js
Description:
  This script handles the key api response

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { config }  from "dotenv";

// Load User Mongoose Schema
import User from "../../schema/User.js";

// Load Environment Parameters
config();

const key = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id)
    if(!user){
      res.send("");
    }else{
      res.send(user.key);
    }
};

export default key;
