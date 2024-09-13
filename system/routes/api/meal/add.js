/*
Filename:
  optiplex/system/routes/api/meal/add.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { Types } from "mongoose";
import Meal from "../../../database/schema/Meal.js";
import { BadInput } from "../../../utils/Responses.js";

import { writeFile } from 'fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function (req, res) {
  const eaters = req.body.who_ate.map(e => Types.ObjectId.createFromHexString(e));

  //TODO: add data validation
  if (req.body.date.valueOf() > Date.now().valueOf()) return BadInput(res);

  let new_meal = new Meal({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    system: Types.ObjectId.createFromHexString(req.body.system_id),
    author: res.locals.user._id,
    eaters: eaters,
    likes: [],
    comments: [],
    shares: 0,
    views: 0
  });

  try {
    const meal = await new_meal.save();

    // save photo
    const base64Data = req.body.photo.replace(/^data:image\/png;base64,/, "");
    writeFile(`${__dirname.split("system")[0]}/system/public/meal/${meal._id.toString()}.png`, base64Data, 'base64', function (err) {
      
    });

    res.json(meal);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json();
  }

}
