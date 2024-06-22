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

config({ path: "../.env" });

if (process.env.AUTH_URL == "https://auth.optiplex.com/") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
}

let active_sessions = [];
setInterval(() => {
  active_sessions = [];
}, 1000 * 60 * 60 * 3); // clear every 3 hrs

class SessionUser {
  constructor(id, email, key) {
    this.id = id;
    this.email = email;
    this.key = key;
  }

  // maybe add some random fail so key is checked against db every once in while
  validate(id, email, key) {
    return (
      id === this.id &&
      email === this.email &&
      key === this.key
    )
  }
}

export async function jwt_middleware(req, res, next) {
  try {
    const token = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
    res.locals.id = token.id;
    res.locals.email = token.email;

    for(let user of active_sessions){
      if(user.validate(token.id, token.email, token.key)) next();
    }

    let key = await (await fetch(process.env.AUTH_URL + "api/key/" + res.locals.id)).text();
    if (key === token.key) {
      active_sessions.push(new SessionUser(token.id, token.email, token.key));
      next();
    }
    else res.redirect(process.env.AUTH_URL + "logout");

  } catch {
    res.redirect(process.env.AUTH_URL + "?redirect=" + res.locals.url)
  }
}
