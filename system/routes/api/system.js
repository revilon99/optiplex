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
import name from "./system/name.js";
import create from "./system/create.js";
import edit from "./system/edit.js";
import _delete from "./system/delete.js";
import join from "./system/join.js";

// Define Routes
const router = Router();

router.get("/overview", overview);

router.get("/:id", name)
router.get("/:id/users", users);
router.get("/:id/meals", meals);
router.get("/:id/others", others);

router.post("/:id/edit", edit);
router.post("/:id/delete", _delete);
router.get("/:id/join", join);
router.get("/:id/leave", join);

router.post("/create", create);

export default router;
