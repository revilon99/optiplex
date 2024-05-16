/*
Filename:
  optiplex/auth/routes/api.js
Description:
  This script handles authentication api
  routes

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";

// Controllers
import login from "../controller/login.js";
import createUser from "../controller/signup.js";
import { verifyToken } from "../jwt/Token.js";
import User from "../schema/User.js"

// Define Routes
const router = Router();
router.post("/signup", createUser);
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/userdata", (req, res) => {
  try {
    const token = verifyToken(req.cookies.token)
    User.findById(token.id).then((user) => {
      res.json({ email: user.email });
    });
  } catch (e) {
    res.clearCookie("token");
    res.json({ email: "Not Found" });
  }
});

export default router;
