/*
Filename:
  optiplex/system/routes/api/system/name.js
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

  res.json({
    name: system.name,
    pp: system.pp
  });
}
