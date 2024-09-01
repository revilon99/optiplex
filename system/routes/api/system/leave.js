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

  // return false if user already in system
  for (const user of system.users) if (user.toString() == res.locals.user._id.toString()) {
    res.status(409);
    return res.json({ message: "You are already in this system!", success: false });
  }

  try {
    system.users.push(res.locals.user._id);
    await system.save();
    const response = {
      success: true,
      message: "System Joined!",
      id: system._id
    }
    res.json(response);
  } catch (e) {
    res.status(500);
    res.json({ success: false, message: "Server failed to add you. Try again later." });
  }
}
