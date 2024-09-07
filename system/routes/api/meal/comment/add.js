/*
Filename:
  optiplex/system/routes/api/meal/comment/add.js
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

    // todo: add data validation here.
    if(req.body.comment.length < 1) return BadInput(res);

    const comment = {
        author: res.locals.user._id,
        body: req.body.comment, 
        date: Date.now()
    }

    try{
        meal.comments.push(comment);
        await meal.save();
        res.json({
            author: res.locals.user,
            body: comment.body,
            date: prettifyDate(comment.date),
            can_delete: true
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.json({});
    }

}
