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
import like from "./meal/like.js";
import unlike from "./meal/unlike.js";

// Define Routes
const router = Router();

router.post("/add", add);

router.get("/like/:id", like);
router.get("/unlike/:id", unlike);

export default router;
