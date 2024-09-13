/*
Filename:
  optiplex/system/routes/api/meal/add.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { Types } from "mongoose";
import Meal from "../../../database/schema/Meal.js";
import { BadInput } from "../../../utils/Responses.js";

export default async function (req, res) {
  const eaters = req.body.who_ate.map(e => Types.ObjectId.createFromHexString(e));

  //TODO: add data validation
  if(req.body.date.valueOf() > Date.now().valueOf()) return BadInput(res);

  let new_meal = new Meal({
    title: req.body.title,
    description: req.body.description,
    photo: req.body.photo,
    date: req.body.date,
    system: Types.ObjectId.createFromHexString(req.body.system_id),
    author: res.locals.user._id,
    eaters: eaters,
    likes: [],
    comments: [],
    shares: 0,
    views: 0
  });

  try{
    const meal = await new_meal.save();
    res.json(meal);
  }catch(e){
    console.log(e);
    res.status(500);
    res.json();
  }
  
}
