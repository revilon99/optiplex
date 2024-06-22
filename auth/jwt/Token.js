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

config({path: "../.env"});

export function createSecretToken(user) {
  let token_body = {
    id:    user._id,
    email: user.email,
    key:   user.key
  }

  return jwt.sign(token_body, process.env.TOKEN_KEY, {
    expiresIn: 24 * 60 * 60, // day long token
  });
}

export function verifyToken(token){
  return jwt.verify(token, process.env.TOKEN_KEY)
}

export function RandomString(length=8) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}