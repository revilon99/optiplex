/*
Filename:
  optiplex/system/routes/api/system/overview.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Meal from "../../../database/schema/Meal.js";
import System from '../../../database/schema/System.js';

export default async function (req, res) {

    let response = [];

    const systems = await System.find({ users: res.locals.user._id });
    for (const system of systems) {

        let system_overview = {
            pp: system.pp,
            name: system.name,
            id: system._id,
            score: 0
        }

        const meals = await Meal.find({ system: system._id });
        for (const meal of meals) {
            if (res.locals.user._id.toString() === meal.author.toString()) system_overview.score += meal.eaters.length;

            for (const eater of meal.eaters) {
                if (res.locals.user._id.toString() === eater.toString()) system_overview.score--;
            }
        }

        response.push(system_overview);
    }

    res.json(response);
}
