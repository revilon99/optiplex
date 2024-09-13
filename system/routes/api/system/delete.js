/*
Filename:
  optiplex/system/routes/api/system/delete.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Meal from '../../../database/schema/Meal.js';
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
    // remove system
    await System.findByIdAndDelete(system_id);

    // remove all system meals
    await Meal.deleteMany({system_id: system_id}); //todo: confirm this works

    res.json({});
  }catch(e){
    console.log(e);
    res.status(500);
    res.json({});
  }
}
