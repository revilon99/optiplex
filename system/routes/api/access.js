/*
Filename:
  optiplex/system/routes/api/access.js
Description:
  This endpoint confirms that a user does/does not have access
  to the system - but does have a oli.casa account

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import User from "../../database/schema/User.js";

export default async function (req, res) {
    const user = await User.findOne({ id: res.locals.id });

    if (user) {
        res.locals.user = user;
        res.send(true);
    } else {
        // user not found in database
        res.send(false);
        return;
    }
}