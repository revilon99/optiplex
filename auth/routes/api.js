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
import login from "./api/login.js";
import createUser from "./api/signup.js";
import { logout, logoutHard } from "./api/logout.js";
import key from "./api/key.js";
import { updatePassword } from "./api/update.js";
import {resetpassword, resetpasswordrequest} from "./api/resetpassword.js";

// Define Routes
const router = Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post("/updatePassword", updatePassword);
router.post("/resetpassword", resetpasswordrequest);
router.post("/passwordreset", resetpassword);

router.get("/logout", logout);
router.get("/logout/hard", logoutHard);
router.get("/key/:id", key);

export default router;
