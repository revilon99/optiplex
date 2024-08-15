/*
Filename:
  optiplex/system/routes/api.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";
import { jwt_middleware as auth } from "../../auth/library/middleware.js";

// endpoints
import feed from "./api/feed.js";
import system from "./api/system.js";
import user from "./api/user.js";
import system_middleware from "./api/system_middleware.js";
import account from "./api/account.js";
import signup from "./api/signup.js";
import access from "./api/access.js";

// Define Routes
const router = Router();

router.get("/access", auth, access);
router.post("/signup", auth, signup);

router.get("/feed", auth, system_middleware, feed);
router.get("/account", auth, system_middleware, account);
router.use("/system", auth, system_middleware, system);
router.use("/user", auth, system_middleware, user);

export default router;
