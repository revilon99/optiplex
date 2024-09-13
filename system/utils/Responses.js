/*
Filename:
  optiplex/system/utils/Responses.js
Description:
  a collection of template repsonses for bad requests

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export const NotFound = (res)=>{
    res.status(404);
    res.send();
}

export const BadInput = (res)=>{
  res.status(400);
  res.send();
}