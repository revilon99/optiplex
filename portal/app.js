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

/* setup Express server */
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

/* middleware */
app.use((_req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", process.env.HELLOWORLD_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // asign project url for auth middleware
  res.locals.url = process.env.HELLOWORLD_URL;

  // Pass to next layer of middleware
  next();
});

// Home route
app.get("/", auth, (req, res) => {
  res.render("index", {username: res.locals.email});
});

// listen on cli defined port
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
