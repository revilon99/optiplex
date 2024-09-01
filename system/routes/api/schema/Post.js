/*
Filename:
  optiplex/system/routes/api/schema/Post.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { prettifyDate } from "../../../utils/Pretty.js";

export default function(user, post){
    let user_liked_post = false;
    for(const liker of post.likes) if(liker._id.toString() == user._id.toString()) user_liked_post = true;

    const response = {
        id: post._id,
        system_id: post.system._id,
        system_name: post.system.name,
        user_id: post.author._id,
        name: post.author.name,
        pp: post.author.pp,
        title: post.title,
        description: post.description,
        img: post.photo,
        date: prettifyDate(post.date),
        likes: post.likes,
        num_shares: post.shares,
        comments: post.comments,
        user_liked_post: user_liked_post,
        user_in_system: true // todo: add posts of interest not accessible to user
    };

    return response;
}