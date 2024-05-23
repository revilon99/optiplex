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
import { verifyToken } from '../jwt/Token.js'
import User            from "../schema/User.js";
import { config } from "dotenv"

config({path: "../.env"});

// Routes
const login = (req, res) => {
  try {
    const token = verifyToken(req.cookies.token);
    User.findById(token.id).then(user => {
      if(user) res.render("home", {email: user.email})
      else     res.redirect("/logout");
    });    
  } catch {
    const error = req.query.error || "";
    const redirect = req.query.redirect || "";
    res.render("login", {error: prettifyError(error), redirect: redirect})
  }
}

const signup = (req, res) => {
  try {
    verifyToken(req.cookies.token)
    res.redirect("/")
  } catch {
    const error = req.query.error || "";
    const redirect = req.query.redirect || "";
    res.render("register", {error: prettifyError(error), redirect: redirect})
  }
}

// Define Routes
const router = Router();
router.get("/", login);
router.get("/login", login)
router.get("/signup", signup)
router.get("/register", signup)
router.get("/logout", (_req, res) => {
  res.clearCookie("token", {domain: process.env.ROOT_URL});
  res.redirect("/");
});

// Frontend Utilities
const prettifyError = (error) => {
  switch(error){
    case "":
      return ""
    case "INVALID_INPUT":
      return "Input is not valid. Try again."
    case "INVALID_CREDENTIALS":
      return "Username or Password not recognised. Try Again."
    case "BAD_EMAIL":
      return "Please input a valid email..."
    case "BAD_PASSWORD":
      return "Passwords must contain at least 8 characters, one lowercase, one uppercase and a number"
    case "BAD_MATCH":
      return "Passwords must match"
    default:
      return "Unknown Error. Please try again later."
  }
}

export default router;
