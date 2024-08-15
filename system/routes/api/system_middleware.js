/*
Filename:
  optiplex/system/routes/api/system_middleware.js
Description:
  This script handles middleware for other optiplex services

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import User from "../../database/schema/User.js";

export default async function system_middleware(req, res, next) {
    const user = await User.findOne({id: res.locals.id});

    if(user){
        res.locals.user = user;
        next();
    }else{
        // user not found in database
        res.status(401);
        res.send();
        return;
    }
}
