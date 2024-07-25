/*
Filename:
  optiplex/system/routes/api/system.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";

// endpoints
import overview from "./system/overview.js"
import meals from "./system/meals.js"
import others from "./system/others.js"
import users from "./system/users.js";

// Define Routes
const router = Router();

router.get("/overview", overview);
router.get("/:id/users", users);
router.get("/:id/meals", meals);
router.get("/:id/others", others);

export default router;
