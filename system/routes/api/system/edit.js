/*
Filename:
  optiplex/system/routes/api/system/edit.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import System from '../../../database/schema/System.js';
import { NotFound } from '../../../utils/Responses.js';

export default async function (req, res) {
  const system_id = req.params.id;

  let system 
  try{
    system = await System.findById(system_id);
  } catch {
    return NotFound(res);
  }

  if (!system) return NotFound(res);

  let user_has_permission = false;
  for(const user of system.users) if(user.toString() == res.locals.user._id.toString()) user_has_permission = true;

  if(!user_has_permission){
    res.status(403);
    return res.send();
  }

  try{
    system.name = req.body.name;
    system.pp = req.body.pp;
    await system.save();
    res.json({});
  }catch(e){
    res.status(500);
    res.json({});
  }
}
