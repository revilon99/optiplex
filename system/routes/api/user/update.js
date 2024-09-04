/*
Filename:
  optiplex/system/routes/api/user/update.js
Description:

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";

// endpoints
import name from "./update/name.js";

// Define Routes
const router = Router();

router.post("/name", name);

export default router;
