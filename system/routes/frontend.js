/*
Filename:
  optiplex/system/routes/frontend.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { Router } from "express";
import { jwt_middleware as auth } from "../../auth/library/middleware.js";

// pages
import index from "./frontend/index.js"

// Define Routes
const router = Router();

router.get("/", auth, index);

export default router;
