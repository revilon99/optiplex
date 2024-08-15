/*
Filename:
  optiplex/system/routes/api/feed.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default async function(req, res) {
    const user = res.locals.user;

    // todo

    res.json(FEED_API_RESPONSE);
}

const FEED_API_RESPONSE = [
    {
        user_id: "skdmkmXkmsm",
        name: "Oli Cass",
        pp: "chef-male",
        system_id: "skdaxxXKSLd",
        system_name: "14 Grange Drive",
        user_in_system: true,
        title: "One Fried Egg",
        description: "A simple dish to get us started",
        img: "egg",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6
    },
    {
        user_id: "skdmkmXkmsm",
        name: "Oli Cass",
        pp: "chef-male",
        system_id: "skdaxxXKSLd",
        system_name: "14 Grange Drive",
        user_in_system: false,
        title: "One Fried Egg",
        description: "A simple dish to get us started",
        img: "egg",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6
    },
    {
        user_id: "skdmkmXkmsm",
        name: "Oli Cass",
        pp: "chef-male",
        system_id: "skdaxxXKSLd",
        system_name: "14 Grange Drive",
        user_in_system: true,
        title: "One Fried Egg",
        description: "A simple dish to get us started",
        img: "egg",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6
    },
    {
        user_id: "skdmkmXkmsm",
        name: "Oli Cass",
        pp: "chef-male",
        system_id: "skdaxxXKSLd",
        system_name: "14 Grange Drive",
        user_in_system: true,
        title: "One Fried Egg",
        description: "A simple dish to get us started",
        img: "egg",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6
    },
    {
        user_id: "skdmkmXkmsm",
        name: "Oli Cass",
        pp: "chef-male",
        system_id: "skdaxxXKSLd",
        system_name: "14 Grange Drive",
        user_in_system: true,
        title: "One Fried Egg",
        description: "A simple dish to get us started",
        img: "egg",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6
    }
]
