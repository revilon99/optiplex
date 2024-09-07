/*
Filename:
  optiplex/system/routes/api/meal/comment/delete.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Meal from "../../../../database/schema/Meal.js";
import { prettifyDate } from "../../../../utils/Pretty.js";
import { BadInput, NotFound } from "../../../../utils/Responses.js";

export default async function (req, res) {
    const meal_id = req.params.id;

    let meal;
    try {
        meal = await Meal.findById(meal_id);
    } catch {
        return NotFound(res);
    }

    if (!meal) return NotFound(res);

    let comment_index = -1;

    for(let i = 0; i < meal.comments.length; i++){
        const comment = meal.comments[i];
        if(meal.comments[i].body != req.body.comment.body) continue;
        if(meal.comments[i].author._id.toString() != req.body.comment.author._id) continue;
        // check permission to delete
        if(meal.comments[i].author._id.toString() != res.locals.user._id.toString()) continue;
        comment_index = i;
        break;
    }

    if(comment_index < 0) return BadInput(res);

    try{
        meal.comments.splice(comment_index, 1);

        await meal.save();
        res.json({});
    }catch(e){
        console.log(e);
        res.status(500);
        res.json({});
    }

}
