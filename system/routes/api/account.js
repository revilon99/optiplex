/*
Filename:
  optiplex/system/routes/api/account.js
Description:
    returns name of user requesting endpoint
    
Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default async function(_req, res) {
    res.json({ name: res.locals.user.name, pp: res.locals.user.pp });
}
