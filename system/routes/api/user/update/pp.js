/*
Filename:
  optiplex/system/routes/api/user/update/name.js
Description:
  
Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { BadInput } from "../../../../utils/Responses.js";
import { userPPs } from "../../res/user-pp.js";

export default async function (req, res) {
    if(!pps.includes(req.body.pp)) return BadInput(res);

    try {
        res.locals.user.pp = req.body.pp;
        await res.locals.user.save();
        res.json({});
    } catch (e) {
        res.status(500);
        res.json({});
    }
}

const pps = userPPs;