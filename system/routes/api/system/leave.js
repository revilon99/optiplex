/*
Filename:
  optiplex/system/routes/api/system/leave.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import System from '../../../database/schema/System.js';

export default async function (req, res) {
  const system_id = req.params.id;

  let system
  try {
    system = await System.findById(system_id);
  } catch {
    return NotFound(res);
  }
  if (!system) return NotFound(res);

  let user_in_system = false;
  for(const user of system.users) if(user.toString() == res.locals.user._id.toString()) user_in_system = true;

  if(!user_in_system){
    res.status(403);
    return res.json({ success: false, message: "You are not in this system" });
  }

  try {
    system.users = system.users.filter(x => x.toString() != res.locals.user._id.toString());
    await system.save();
    res.json({});
  } catch (e) {
    res.status(500);
    res.json({ success: false, message: "Server failed to remove you. Try again later." });
  }
}
