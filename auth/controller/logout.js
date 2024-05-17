/*
Filename:
  optiplex/auth/controller/logout.js
Description:
  This script handles the logout response

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

const logout = (_req, res) => {
    res.clearCookie("token");
}

export default logout
