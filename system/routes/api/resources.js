/*
Filename:
  optiplex/system/routes/api/res.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";

// endpoints
import userPp from "./res/user-pp.js";
import systemPp from "./res/system-pp.js";

// Define Routes
const router = Router();

router.get("/user-pp", userPp);
router.get("/system-pp", systemPp);

export default router;
