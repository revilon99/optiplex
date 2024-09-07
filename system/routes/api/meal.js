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
import add_comment from "./meal/comment/add.js";
import delete_comment from "./meal/comment/delete.js";

// Define Routes
const router = Router();

router.post("/add", add);

router.post("/:id/comment/add", add_comment);
router.post("/:id/comment/delete", delete_comment);

router.get("/:id/like", like);
router.get("/:id/unlike", unlike);

export default router;
