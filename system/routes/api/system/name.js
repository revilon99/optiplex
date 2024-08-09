/*
Filename:
  optiplex/system/routes/api/system/name.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default function (req, res) {
    const system_id = req.params.id;
    res.json(API_REPSONSE);
}

const API_REPSONSE = {
  name: "14 Grange Road",
  pp: "crab"
}