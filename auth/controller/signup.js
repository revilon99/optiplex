/*
Filename:
  optiplex/auth/controller/signup.js
Description:
  This script handles the signup response

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// Imports
import User from "../schema/User.js";
import { createSecretToken } from "../jwt/Token.js";
import { hash } from "bcrypt";

// Create User Routh
const createUser = async (req, res) => {
  const invalid_input       = ()=>{res.status(400).json({ message: "All input is required" })};
  const invalid_credentials = ()=>{res.status(404).json({ message: "Invalid credentials" })};

  try {
    // 1) Check input valid
    const input_is_not_valid = !(req.body.email && req.body.password);
    if (input_is_not_valid) return invalid_input();

    // 2) Check if email already exists
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) return res.status(409).send("User Already Exist. Please Login");

    // 3) Create a new user
    const salt = 10;
    const hashedPassword = await hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    
    // 4) return JWT Token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });
    res.json({message: "Signup Successful"});
  } catch (e) {
    console.log("Server Error: ", e);
  }
};

export default createUser;
