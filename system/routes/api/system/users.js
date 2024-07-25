/*
Filename:
  optiplex/system/routes/api/system/users.js
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
        id: "sdalfkjaaKLS",
        name: "Oli Cass",
        pp: "chef-male",
        score: -2
    },
    {
        id: "sdalfkjaaKLS",
        name: "John Doe",
        pp: "chef-male",
        score: 1
    },
    {
        id: "sdalfkjaaKLS",
        name: "Jane Doe",
        pp: "chef-female",
        score: 4
    },
    {
        id: "sdalfkjaaKLS",
        name: "Adam Smith",
        pp: "chef-male",
        score: 0
    }
]
