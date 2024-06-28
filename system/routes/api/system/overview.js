/*
Filename:
  optiplex/system/routes/api/system/overview.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default function(req, res) {
    res.json(API_RESPONSE);
}

const API_RESPONSE = [
    {
        pp: "crab",
        name: "14 Grange Drive",
        score: 5,
        id: "sdkadalKLSksla"
    },
    {
        pp: "pizza",
        name: "18 Manor Place",
        score: -2,
        id: "sdkadalKLSksla"
    },
    {
        pp: "octopus",
        name: "Le Mansion",
        score: 3,
        id: "sdkadalKLSksla"
    },
    {
        pp: "beer",
        name: "1 Range Hill",
        score: 0,
        id: "sdkadalKLSksla"
    },
    {
        pp: "crab",
        name: "473 Belle Vue Terrace",
        score: 1,
        id: "sdkadalKLSksla"
    }
]
