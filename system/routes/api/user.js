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
import overview from "./user/overview.js";
import posts from "./user/posts.js";

// Define Routes
const router = Router();

router.get("/:id", overview);
router.get("/:id/posts", posts);

export default router;
