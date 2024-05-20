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

import { RandomString } from "../jwt/KeyHandler.js";
import { verifyToken } from "../jwt/Token.js";
import User from "../schema/User.js";


export function logout (_req, res) {
  res.clearCookie("token");
  res.redirect("/");
}

export function logoutHard (req, res) {
  try {
    const token = verifyToken(req.cookies.token);
    User.findByIdAndUpdate(token.id, {key: RandomString()}).then(()=>{
      res.redirect("/");
    });
  } catch(e) {
    // do nothing - no user found or token invalid
    console.log(e)
  }
  res.clearCookie("token");
  res.redirect("/");
}

