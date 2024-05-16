/*
Filename:
  optiplex/auth/jwt/Token.js
Description:
  Handles token generation

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

require("dotenv").config();
import { sign } from "jsonwebtoken";

export function createSecretToken(id) {
  return sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 24 * 60 * 60, // day long token
  });
}