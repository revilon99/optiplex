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

import { verifyToken, RandomString } from "../../jwt/Token.js";
import User from "../../schema/User.js";
import { config } from "dotenv"

config({path: "../.env"});

export function logout (_req, res) {
  res.clearCookie("token", {domain: process.env.ROOT_URL});
  res.redirect("/");
}

export async function logoutHard (req, res) {
  try {
    const token = verifyToken(req.cookies.token);
    await User.findByIdAndUpdate(token.id, {key: RandomString()});
  } catch(e) {
    // do nothing - no user found or token invalid
    console.log(e)
  }
  res.clearCookie("token", {domain: process.env.ROOT_URL});
  res.redirect("/");
}

