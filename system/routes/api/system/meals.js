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
            path: 'comments',
            select:
                'name pp',
        })
        .populate({
            path: 'system',
            select:
                'name',
        });

    response = [];
    for (const p of meals) {
        let post = {
            id: p._id,
            system_id: p.system._id,
            system_name: p.system.name,
            user_id: p.author._id,
            name: p.author.name,
            pp: p.author.pp,
            title: p.title,
            description: p.description,
            img: p.photo,
            date: prettifyDate(p.date),
            likes: p.likes,
            num_shares: p.shares,
            comments: p.comments,
            eaters: []
        };

        for (let eater of p.eaters) post.eaters.push({ id: eater._id, name: eater.name, pp: eater.pp })
        response.push(post);
    }

    res.json(response);
}
