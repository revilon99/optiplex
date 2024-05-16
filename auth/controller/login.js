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
import { config } from "dotenv";

// Load User Mongoose Schema
import { findOne } from "../schema/User";
// Load secret token gen function
import { createSecretToken } from "../jwt/Token";

// Load Environment Parameters
config();

// Login Function:
const login = async (req, res) => {
  const invalid_input       = ()=>{res.status(400).json({ message: "All input is required" })};
  const invalid_credentials = ()=>{res.status(404).json({ message: "Invalid credentials" })};

  // 1) get email and password from request body
  const { email, password } = req.body;

  // 2) Validate input 
  const input_is_not_valid = !(email && password);
  if (input_is_not_valid) return invalid_input();

  // 3) Find user by email
  const user = await findOne({ email });
  if(!user) return invalid_credentials();

  // 4) Check if password is correct
  const password_match = await compare(password, user.password);
  if (!password_match) return invalid_credentials();

  // 5) If all good - return 1 day token
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    domain: process.env.FRONTEND_URL,         // Set your domain here
    path: "/",                                // Cookie is accessible from all paths
    expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true,                             // Cookie will only be sent over HTTPS
    httpOnly: true,                           // Cookie cannot be accessed via client-side scripts
    sameSite: "None",
  });
  res.json({ token });
};

export default login;
