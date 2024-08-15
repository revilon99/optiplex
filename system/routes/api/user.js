/*
Filename:
  optiplex/system/routes/api/user.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";

// endpoints
import profile from "./user/profile.js";

// Define Routes
const router = Router();

router.get("/:id", profile);

export default router;
