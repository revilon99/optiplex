/*
Filename:
  optiplex/auth/controller/middleware.js
Description:
  This script handles middleware for other optiplex services

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import jwt from "jsonwebtoken";
import { config } from "dotenv"

config({path: "../.env"});

export async function middleware(req, res, next) {
  console.log(req.cookies);

    try {
      const token = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
      res.locals.id = token.id;
      res.locals.email = token.email;
      let key = await (await fetch(process.env.AUTH_URL + "/api/key/" + res.locals.id)).text(); // this is done for every request - (slow but allows for jwt revocations?)
      
      if(key === token.key) next();
      else res.redirect(process.env.AUTH_URL + "/logout");
    } catch(e) {
      console.log(e);
      res.redirect(process.env.AUTH_URL + "?redirect=" + res.locals.url)
    }
  }