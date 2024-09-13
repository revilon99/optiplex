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

// Define Routes
const router = Router();

router.get("/user-pp", userPp);

export default router;
