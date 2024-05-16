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

// External Libraries
import express from "express";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";

// Interal Libraries
import Connection from "./database/db";
import authApiRoute from "./routes/api";

// Environment setup
var args = process.argv.slice(2);
const PORT = args[0] || 3001;

// Connect to database (defined by .env file)
Connection();

/* setup Express server */
const app = express();
app.use(json({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use((_req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Pass to next layer of middleware
  next();
});

app.use("/api", authApiRoute);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
