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

// Define Routes
const router = Router();

router.get("/feed", auth, feed);

export default router;
