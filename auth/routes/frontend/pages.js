/*
Filename:
  optiplex/auth/routes/frontend/pages.js
Description:
  This script handles authentication frontend routes

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/
import { verifyToken } from '../../jwt/Token.js'
import User            from "../../schema/User.js";

// Login Route
export function login(req, res) {
    try {
        const token = verifyToken(req.cookies.token);
        User.findById(token.id).then(user => {
        if(user) res.render("pages/home", {email: user.email})
        else     res.redirect("/logout");
        });    
    } catch {
        const error = req.query.error || "";
        const redirect = req.query.redirect || "";
        res.render("pages/login", {error: prettifyError(error), redirect: redirect})
    }
}

// Register Route
export function signup(req, res) {
    try {
        verifyToken(req.cookies.token)
        res.redirect("/")
    } catch {
        const error = req.query.error || "";
        const redirect = req.query.redirect || "";
        res.render("pages/register", {error: prettifyError(error), redirect: redirect})
    }
}

// Modify Account Details Route
export function myAccount(req, res){
    const error   = req.query.error || "";
    const success = req.query.msg   || "";
    try {
        const token = verifyToken(req.cookies.token);
        User.findById(token.id).then(user => {
        if(user) {
            let prettySuccess = "";
            if(success === "SUCCESS") prettySuccess = "Password successfully changed.";
            res.render("pages/myaccount", {email: user.email, error: prettifyError(error), success: prettySuccess})
        }else throw error;
        });    
    } catch {
        res.redirect("/logout");
    }
}

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
        return "Passwords must contain at least 8 characters, one lowercase, one uppercase, a number and a special character"
      case "BAD_MATCH":
        return "Passwords must match"
      default:
        return "Unknown Error. Please try again later."
    }
  }
