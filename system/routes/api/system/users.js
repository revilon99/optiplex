/*
Filename:
  optiplex/system/routes/api/system/users.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Meal from '../../../database/schema/Meal.js';
import System from '../../../database/schema/System.js';
import { NotFound } from '../../../utils/Responses.js';

export default async function (req, res) {
    const system_id = req.params.id;

    let system;
    try {
        system = await System.findById(system_id).populate({
            path: 'users',
            select:
                'name pp',
        });
    } catch {
        return NotFound(res);
    }

    if (!system) return NotFound(res);

    let response = [];
    for (const user of system.users) {
        response.push({
            id: user._id,
            name: user.name,
            pp: user.pp,
            score: 0
        });
    }

    const meals = await Meal.find({ system: system._id });

    for (const meal of meals) {
        const cook = meal.author;
        const num_owed = meal.eaters.length;

        for (const user of response) if (user.id.toString() === cook.toString()) {
            user.score += num_owed;
        }

        for (const eater of meal.eaters) {
            for (const user of response) if (user.id.toString() === eater.toString()) {
                user.score--;
            }
        }
    }

    res.json(response);
}
