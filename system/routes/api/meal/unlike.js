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
        meal = await Meal.findById(meal_id)
            .populate({
                path: 'likes',
                select:
                    'name',
            });
    } catch {
        return NotFound(res);
    }

    if (!meal) return NotFound(res);
    
    try{
        meal.likes = meal.likes.filter((a) => a._id.toString() != res.locals.user._id.toString());
        await meal.save();
        return res.json({});
    }catch(e){
        console.log(e);
        res.status(500);
        return res.json({});
    }
}
