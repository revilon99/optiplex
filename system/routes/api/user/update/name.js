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

export default async function (req, res) {
    if(req.body.name == undefined) return BadInput(res);
    if(req.body.name.length < 1) return BadInput(res);

    try {
        res.locals.user.name = req.body.name;
        await res.locals.user.save();
        res.json({});
    } catch (e) {
        res.status(500);
        res.json({});
    }
}
