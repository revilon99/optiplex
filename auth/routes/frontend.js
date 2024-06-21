/*
Filename:
  optiplex/auth/routes/frontend.js
Description:
  This script handles authentication frontend routes

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// Imports
import { Router, }     from "express";
import { config } from "dotenv"
import { login, myAccount, signup } from "./frontend/pages.js"

config({path: "../.env"});

// Define Routes on frontend
const router = Router();
router.get("/", login);
router.get("/myaccount", myAccount);
router.get("/login", login)
router.get("/signup", signup)
router.get("/register", signup)
router.get("/logout", (_req, res) => {
  res.clearCookie("token", {domain: process.env.ROOT_URL});
  res.redirect("/");
});

export default router;
