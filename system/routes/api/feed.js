/*
Filename:
  optiplex/system/routes/api/feed.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Meal from '../../database/schema/Meal.js';
import System from '../../database/schema/System.js';
import { prettifyDate } from "../../utils/Pretty.js";

export default async function (req, res) {
    // todo: make this more interesting
    //       - add posts of interest not accessible to user
    //       - also generally you do not see your own posts

    const systems = await System.find({ users: res.locals.user._id });
    const system_ids = systems.map(a => a._id);

    let response = [];

    const meals = await Meal.find({ system: system_ids })
        .populate({
            path: 'author',
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


    for (const p of meals) {
        let user_liked_post = false;
        for(const user of p.likes) if(user._id.toString() == res.locals.user._id.toString()) user_liked_post = true;

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
            user_liked_post: user_liked_post,
            user_in_system: true // todo: add posts of interest not accessible to user
        };

        response.push(post);
    }

    res.json(response);
}
