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
import { validatePasswordChangeRequest } from '../api/resetpassword.js';
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
            res.render("pages/my_account", {email: user.email, error: prettifyError(error), success: prettySuccess})
        }else throw error;
        });    
    } catch {
        res.redirect("/logout");
    }
}

// reset Password Page
export function resetPasswordReq(req, res){
    const error   = req.query.error || "";
    try {
        // if there is a valid token - the password isn't forgotten - go to home
        verifyToken(req.cookies.token)
        res.redirect("/")
    } catch {
        res.render("pages/reset_password", {error: prettifyError(error)})
    }
}
export function resetPasswordReqed(req, res){
    res.render("pages/password_reset_requested");
}
export function resetPasswordSuccess(req, res){
    res.render("pages/password_reset_success");
}
export function resetPassword(req, res){
    const activeRequest = validatePasswordChangeRequest(req.query.email, req.query.key);
    const success = req.query.msg   || "";
    const email = req.query.email   || "";
    const key = req.query.key   || "";
    const error   = req.query.error || "";
    if(!activeRequest){
        res.redirect("/");
        return;
    }
    try {
        // if there is a valid token - the password isn't forgotten - go to home
        verifyToken(req.cookies.token)
        res.redirect("/")
    } catch {
        let prettySuccess = "";
        if(success === "SUCCESS") prettySuccess = "Password successfully changed.";
        res.render("pages/password_reset", {email: email, key: key, msg: prettySuccess, error: prettifyError(error)})
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
      case "USER_EXISTS":
        return "Username is taken."
      case "USER_NOT_EXIST":
        return "Username is not recognised."
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
