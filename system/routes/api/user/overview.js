/*
Filename:
  optiplex/system/routes/api/user/overview.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default function (req, res) {
    const user_id = req.params.id;
    res.json(API_RESPONSE);
}

const API_RESPONSE = {
  name: "John Doe",
  meals: 10,
  last_post: "2 weeks ago",
  pp: "chef-male"
}