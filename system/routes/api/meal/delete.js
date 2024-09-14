/*
Filename:
  optiplex/system/routes/api/meal/delete.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { Types } from "mongoose";
import Meal from "../../../database/schema/Meal.js";

export default async function (req, res) {
  const meal_id = req.params.id;

  let meal;
  try {
    meal = await Meal.findById(meal_id);
  } catch {
    return NotFound(res);
  }

  if (!meal) return NotFound(res);

  let user_has_permission = (meal.author.toString() === res.locals.user._id.toString());

  if(!user_has_permission){
    res.status(403);
    return res.send();
  }

  try {
    // remove meal
    await Meal.findByIdAndDelete(meal_id);

    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({});
  }

}
