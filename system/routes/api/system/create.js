/*
Filename:
  optiplex/system/routes/api/system/create.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import System from '../../../database/schema/System.js';

export default async function (req, res) {

    // todo: add data validation

    const new_system = new System({
        name: req.body.name,
        pp: req.body.pp,
        users: [res.locals.user._id]
    });

    try{
        const system = await new_system.save();
        res.json(system);
      }catch(e){
        console.log(e);
        res.status(500);
        res.json();
      }
}
