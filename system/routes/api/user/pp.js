/*
Filename:
  optiplex/system/routes/api/user/pp.js
Description:
    returns all available profile pictures for users
    
Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default async function(_req, res) {
    res.json(["chef-male", "chef-female"]);
}
