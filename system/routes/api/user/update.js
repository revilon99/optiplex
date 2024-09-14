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
import pp from "./update/pp.js";

// Define Routes
const router = Router();

router.post("/name", name);
router.post("/pp", pp);

export default router;
