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
import { logout, logoutHard } from "../controller/logout.js";
import key from "../controller/key.js";
import { updatePassword } from "../controller/update.js";

// Define Routes
const router = Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post("/updatePassword", updatePassword);

router.get("/logout", logout);
router.get("/logout/hard", logoutHard);
router.get("/key/:id", key);

export default router;
