/*
Filename:
  optiplex/system/routes/api/system/others.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import System from '../../../database/schema/System.js';
import { NotFound } from "../../../utils/Responses.js";

export default async function (req, res) {
    const system_id = req.params.id;

    let system;
    try {
        system = await System.findById(system_id)
        .populate({path: "users", select: "name"});
    } catch {
        return NotFound(res);
    }

    if (!system) return NotFound(res);

    let entire_system = [];
    for(const user of system.users){
        entire_system.push({
            id: user._id,
            name: user.name
        });
    }

    let response = entire_system.filter(item => item.id.toString() !== res.locals.user._id.toString());
    res.json(response);
}
