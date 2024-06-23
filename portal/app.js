/*
Filename:
  optiplex/portal/app.js
Description:
  A portal which can manage oli.casa optiplex project remotely.
  Potentially in future it will serve other personal content.

Project:
  portal #0000 (portal.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// Libraries
import express      from "express";
import bodyParser   from "body-parser";
import cookieParser from "cookie-parser";
import { config }   from "dotenv"

import { jwt_middleware as auth } from "../auth/library/middleware.js";

// Environment setup
let args = process.argv.slice(2);
const PORT = args[0] || 3000;

config({path: "../.env"});

// Connect to database (defined by .env file)
import Connection from "./db.js";
import { get_user_access } from "./controllers/access_control.js";
Connection();

/* setup Express server */
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

/* middleware */
app.use((_req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", process.env.PORTAL_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // asign project url for auth middleware
  res.locals.url = process.env.PORTAL_URL;

  // Pass to next layer of middleware
  next();
});

// Home route
app.get("/", auth, async (req, res) => {
  // get level of access
  const access = await get_user_access(res.locals.id);
  switch(access){
    case "superuser":
      res.render("index", {username: res.locals.email, access: access});
      break;
    case "admin":
      res.render("index", {username: res.locals.email, access: access});
      break;
    case "user":
    default:
      res.render("index", {username: res.locals.email, access: "user"});
      break;
  }
});

// listen on cli defined port
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// Serve public content
app.use("/", express.static("public"));
