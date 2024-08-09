/*
Filename:
  optiplex/system/routes/api/user/posts.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default function(req, res) {
    const user_id = req.params.id;
    res.json(FEED_API_RESPONSE);
}

const FEED_API_RESPONSE = [
    {
        system_id: "askmdaxXSSsAmksa",
        system_name: "14 Grange Road",
        user_id: "sdajkadlaksdlaksdj",
        name: "Oli Cass",
        pp: 'chef-male',
        title: "One Fried Egg",
        img: "egg",
        description: "A simple dish to get us started",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6,
        eaters: [
            {
                id: "saldaksd",
                name: "John Doe",
                pp: "chef-male"
            },
            {
                id: "saldaksd",
                name: "Jane Doe",
                pp: "chef-female"
            }
        ]
    },
    {
        user_id: "sdajkadlaksdlaksdj",
        name: "Oli Cass",
        pp: 'chef-male',
        title: "One Fried Egg",
        img: "egg",
        description: "A simple dish to get us started",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6
    },
    {
        system_id: "askmdaxXSSsAmksa",
        system_name: "14 Grange Road",
        user_id: "sdajkadlaksdlaksdj",
        name: "Oli Cass",
        pp: 'chef-male',
        title: "One Fried Egg",
        img: "egg",
        description: "A simple dish to get us started",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6,
        eaters: [
            {
                id: "saldaksd",
                name: "John Doe",
                pp: "chef-male"
            },
            {
                id: "saldaksd",
                name: "Jane Doe",
                pp: "chef-female"
            }
        ]
    },
    {
        system_id: "askmdaxXSSsAmksa",
        system_name: "14 Grange Road",
        user_id: "sdajkadlaksdlaksdj",
        name: "Oli Cass",
        pp: 'chef-male',
        title: "One Fried Egg",
        img: "egg",
        description: "A simple dish to get us started",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6,
        eaters: [
            {
                id: "saldaksd",
                name: "John Doe",
                pp: "chef-male"
            },
            {
                id: "saldaksd",
                name: "Jane Doe",
                pp: "chef-female"
            }
        ]
    },
    {
        system_id: "askmdaxXSSsAmksa",
        system_name: "14 Grange Road",
        user_id: "sdajkadlaksdlaksdj",
        name: "Oli Cass",
        pp: 'chef-male',
        title: "One Fried Egg",
        img: "egg",
        description: "A simple dish to get us started",
        date: "3 hours ago",
        num_likes: 14,
        num_shares: 5,
        num_comments: 6,
        eaters: [
            {
                id: "saldaksd",
                name: "John Doe",
                pp: "chef-male"
            },
            {
                id: "saldaksd",
                name: "Jane Doe",
                pp: "chef-female"
            }
        ]
    }
]
