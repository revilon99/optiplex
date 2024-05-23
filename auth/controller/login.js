/*
Filename:
  optiplex/auth/controller/login.js
Description:
  This script handles the login response

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import { compare } from "bcrypt";
import { config }  from "dotenv";

// Load User Mongoose Schema
import User from "../schema/User.js";
// Load secret token gen function
import { createSecretToken } from "../jwt/Token.js";

// Load Environment Parameters
config();

// Login Function:
const login = async (req, res) => {
  const invalid_input       = ()=>{
    res.redirect("/login?error=INVALID_INPUT");
  };
  const invalid_credentials = ()=>{
    res.redirect("/login?error=INVALID_CREDENTIALS");
  };

  // 1) get email and password from request body
  const { email, password, redirect } = req.body;

  // 2) Validate input 
  const input_is_not_valid = !(email && password);
  if (input_is_not_valid) return invalid_input();

  // 3) Find user by email
  const user = await User.findOne({ email });
  if(!user) return invalid_credentials();

  // 4) Check if password is correct
  const password_match = await compare(password, user.password);
  if (!password_match) return invalid_credentials();

  // 5) If all good - return 1 day token
  const token = createSecretToken(user);
  res.cookie("token", token, {
    path: "/",                                // Cookie is accessible from all paths
    domain: process.env.ROOT,
    expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true,                             // Cookie will only be sent over HTTPS
    httpOnly: true,                           // Cookie cannot be accessed via client-side scripts
    sameSite: "None"
  });

  if(redirect == "") res.redirect("/");
  else res.redirect(redirect);
};

export default login;
