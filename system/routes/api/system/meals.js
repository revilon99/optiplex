/*
Filename:
  optiplex/system/routes/api/system/meals.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default function (req, res) {
    res.json(API_RESPONSE);
}

const API_RESPONSE = [
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
