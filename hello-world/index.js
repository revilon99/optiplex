/*
Filename:
  optiplex/hello-world/index.js
Description:
  A hello world script for the optiplex world

Project:
  hello-world #0000 (hello-world.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// Libraries
import express      from "express";
import bodyParser   from "body-parser";
import cookieParser from "cookie-parser";
import { config }   from "dotenv"

import { middleware } from "../auth/controller/middleware.js";

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
app.use((req, res, next) => {
  res.locals.url = process.env.HELLOWORLD_URL;
  next();
});

app.get("/", middleware, (req, res) => {
  res.render("index", {username: res.locals.email});
});

// listen on cli defined port
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
