/*
Filename:
  optiplex/system/routes/api/feed.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default async function(req, res) {
    res.json({ name: res.locals.user.name });
}
