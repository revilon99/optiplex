/*
Filename:
  optiplex/system/routes/api/meal.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";

// endpoints
import add from "./meal/add.js";

// Define Routes
const router = Router();

router.post("/add", add);

export default router;
