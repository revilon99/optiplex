/*
Filename:
  optiplex/system/app.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// Libraries
import express      from "express";
import compression  from "compression";
import bodyParser   from "body-parser";
import cookieParser from "cookie-parser";
import { config }   from "dotenv"

// Environment setup
let args = process.argv.slice(2);
const PORT = args[0] || 3002;

config({path: "../.env"});

/* setup Express server */
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

/* middleware */
app.use((_req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", process.env.SYSTEM_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // asign project url for auth middleware
  res.locals.url = process.env.SYSTEM_URL;

  // Pass to next layer of middleware
  next();
});

// Define routes
import frontendRoute from "./routes/frontend.js";
import apiRoute from "./routes/api.js";
app.use("/", frontendRoute);
app.use("/api", apiRoute);

// Serve public content
app.use("/", express.static("public"));
app.use("/", express.static("web"));

// listen on cli defined port
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
