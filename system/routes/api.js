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
import feed from "./api/feed.js"
import system from "./api/system.js"
import user from "./api/user.js"

// Define Routes
const router = Router();

router.get("/feed", auth, feed);
router.use("/system", auth, system);
router.use("/user", auth, user)

export default router;
