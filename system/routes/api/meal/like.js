/*
Filename:
  optiplex/system/routes/api/meal/like.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Meal from "../../../database/schema/Meal.js";
import { NotFound } from "../../../utils/Responses.js";

export default async function (req, res) {
    const meal_id = req.params.id;

    let meal;
    try {
        meal = await Meal.findById(meal_id);
    } catch {
        return NotFound(res);
    }

    if (!meal) return NotFound(res);

    for(const user in meal.likes) if(user.toString() == res.locals.user._id.toString()) {
        res.status(400);
        return res.json({});
    }

    try{
        meal.likes.push(res.locals.user._id);
        await meal.save();
        res.json({});
    }catch(e){
        console.log(e);
        res.status(500);
        res.json({});
    }
}
