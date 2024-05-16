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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define Routes
const router = Router();
router.get("/", (req, res) => {
  try{
    verifyToken(req.cookies.token)
    res.sendFile("/html/home.html", { root : __dirname});
  }catch{
    res.sendFile("/html/login.html", { root : __dirname});
  }
});
router.get("/login", (req, res) => {
    res.sendFile("/html/login.html", { root : __dirname});
})
router.get("/signup", (req, res) => {
    res.sendFile("/html/register.html", { root : __dirname});
})
router.get("/register", (req, res) => {
    res.sendFile("/html/register.html", { root : __dirname});
})

export default router;
