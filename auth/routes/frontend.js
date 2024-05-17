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

// External Libraries
import { Router, } from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { verifyToken } from '../jwt/Token.js'
import User from "../schema/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define Routes
const login = (req, res) => {
  try {
    const token = verifyToken(req.cookies.token);
    User.findById(token.id).then(user => res.render("home", {email: user.email}));    
  } catch {
    res.sendFile("/html/login.html", { root: __dirname });
  }
}

const signup = (req, res) => {
  try {
    verifyToken(req.cookies.token)
    User.findById(token.id).then(user => res.render("home", {email: user.email}));   
  } catch {
    res.sendFile("/html/register.html", { root: __dirname });
  }
}


const router = Router();
router.get("/", login);
router.get("/login", login)
router.get("/signup", signup)
router.get("/register", signup)
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default router;
