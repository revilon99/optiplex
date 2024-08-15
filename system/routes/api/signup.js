/*
Filename:
  optiplex/system/routes/api/signup.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import User from '../../database/schema/User.js'

export default async function(req, res) {
  const user_fullname = req.body.name;
  const user_id = res.locals.id;

  console.log(user_id);

  const new_user = new User({
    id: user_id,
    name: user_fullname,
    pp: "chef-male" //todo
  });

  const user = await new_user.save();
  
  res.json({success: true});
}