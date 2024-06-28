/*
Filename:
  optiplex/system/routes/api/system/others.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export default function (req, res) {
    const system_id = req.params.id;
    let entire_system = API_RESPONSE;
    let response = entire_system.filter(item => item.id !== res.locals.id);
    res.json(response);
}

const API_RESPONSE = [
    {
        id: "667582aabf21a6cdfa31025f",
        name: "John Doe"
    },
    {
        id: "SasdavfFFsasdaf",
        name: "Jane Doe"
    },
    {
        id: "LSlsdklKdsodnalsd",
        name: "Helen Lovejoy"
    },
    {
        id: "Sosd9dJSkjsdkja",
        name: "Rob Smith"
    },
    {
        id: "FGUDHKjwkwjakds",
        name: "Mike Jones"
    }
]
