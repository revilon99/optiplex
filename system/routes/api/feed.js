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
import Post from './schema/Post.js';

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


    for (const p of meals) response.push(Post(res.locals.user, p));

    res.json(response);
}
