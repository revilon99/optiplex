/*
Filename:
  optiplex/auth/app.js
Description:
  The main script that handles authentication for all
  optiplex services

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// Libraries
import express      from "express";
import bodyParser   from "body-parser";
import cookieParser from "cookie-parser";

// Import routes
import frontendRoute from "./routes/frontend.js";
import apiRoute      from "./routes/api.js";

// Environment setup
let args = process.argv.slice(2);
const PORT = args[0] || 3001;

// Connect to database (defined by .env file)
import Connection from "./database/db.js";
Connection();

/* setup Express server */
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use((_req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Pass to next layer of middleware
  next();
});

// Define routes
app.use("/", frontendRoute);
app.use("/api", apiRoute);

// listen on cli defined port
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// Serve public content
app.use("/", express.static("public"));
