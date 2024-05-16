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

import { config } from "dotenv"
import jwt from "jsonwebtoken";

config();

export function createSecretToken(id) {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 24 * 60 * 60, // day long token
  });
}

export function verifyToken(token){
  return jwt.verify(token, process.env.TOKEN_KEY)
}
