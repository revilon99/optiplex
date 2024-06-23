/*
Filename:
  optiplex/portal/controllers/access_control.js
Description:
  handles access of users

Project:
  portal #0000 (portal.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/
import Access from "../schema/UserAccess.js";

export async function get_user_access(id) {
    const access = await Access.findOne({ id });

    if (!access) {
        const user = add_user_to_db(id);
        return user.access;
    }

    return access.access;
}

async function add_user_to_db(id, access = "user") {
    const newUser = new Access({
        id: id,
        access: access
    });
    return await newUser.save();
}
