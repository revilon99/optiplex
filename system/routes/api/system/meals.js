/*
Filename:
  optiplex/system/routes/api/system/meals.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Meal from '../../../database/schema/Meal.js';
import System from '../../../database/schema/System.js';
import { NotFound } from '../../../utils/Responses.js';
import { prettifyDate } from "../../../utils/Pretty.js";
import Post from '../schema/Post.js';

export default async function (req, res) {
    const system_id = req.params.id;

    let system;
    try {
        system = await System.findById(system_id);
    } catch {
        return NotFound(res);
    }

    if (!system) return NotFound(res);

    let response = [];

    const meals = await Meal.find({ system: system._id })
        .populate({
            path: 'author',
            select:
                'name pp',
        })
        .populate({
            path: 'eaters',
            select:
                'name pp',
        })
        .populate({
            path: 'likes',
            select:
                'name pp',
        })
        .populate({
            path: 'comments.author',
            select:
                'name pp',
        })
        .populate({
            path: 'system',
            select:
                'name',
        })
        .sort("field -date");

    response = [];
    for (const p of meals) {
        let post = Post(res.locals.user, p);

        post.eaters = [];
        for (let eater of p.eaters) post.eaters.push({ id: eater._id, name: eater.name, pp: eater.pp });

        response.push(post);
    }

    res.json(response);
}
