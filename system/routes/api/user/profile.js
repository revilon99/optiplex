/*
Filename:
  optiplex/system/routes/api/user/overview.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import User from "../../../database/schema/User.js";
import Meal from "../../../database/schema/Meal.js";
import { prettifyDate } from "../../../utils/Pretty.js";
import { NotFound } from "../../../utils/Responses.js";

export default async function (req, res) {
  const user_id = req.params.id;

  let user;
  try {
    user = await User.findById(user_id);
  } catch {
    return NotFound(res);
  }

  if (!user) return NotFound(res);

  let response = {};

  response.name = user.name;
  response.pp = user.pp;

  let most_recent = 0;
  response.last_post = "Never posted";

  const meals = await Meal.find({ author: user._id })
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

  response.posts = [];
  for (const p of meals) {
    if(p.date.valueOf() > most_recent){
      most_recent = p.date.valueOf();
      console.log(p.date.toDateString())
      response.last_post = prettifyDate(p.date);
    }

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

    for(let eater of p.eaters) post.eaters.push({id: eater._id, name: eater.name, pp: eater.pp})
    response.posts.push(post);
  }
  
  response.meals = meals.length;
  res.json(response);
}
