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
import { RandomString } from "../jwt/KeyHandler.js";
import { hash } from "bcrypt";

// Create User Routh
const createUser = async (req, res) => {
  const invalid_input = ()=>{res.redirect("/register?error=INVALID_INPUT");};
  const user_exists   = ()=>{res.redirect("/register?error=USER_EXISTS");};
  const bad_email     = ()=>{res.redirect("/register?error=BAD_EMAIL");};
  const bad_password  = ()=>{res.redirect("/register?error=BAD_PASSWORD");};
  const bad_match     = ()=>{res.redirect("/register?error=BAD_MATCH");};

  try {
    // 1) Check input exists
    const input_does_not_exist = !(req.body.email && req.body.password && req.body.passwordConfirm);
    if (input_does_not_exist) return invalid_input();

    // 2) Check if email already exists
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) return user_exists();

    // 3) validate input
    if(!validateEmail(req.body.email)) return bad_email();
    if(!validatePassword(req.body.password)) return bad_password();
    if(!(req.body.password === req.body.passwordConfirm)) return bad_match();

    // 4) Create a new user
    const salt = 10;
    const hashedPassword = await hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      key: RandomString()
    });
    const user = await newUser.save();
    
    // 5) return JWT Token
    const token = createSecretToken(user);
    res.cookie("token", token, {
      path: "/",        // Cookie is accessible from all paths
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
      secure: true,     // Cookie will only be sent over HTTPS
      httpOnly: true,   // Cookie cannot be accessed via client-side scripts
      sameSite: "None"
    });
  } catch (e) {
    console.log("Server Error: ", e);
  }

  if(req.body.redirect == "") res.redirect("/");
  else res.redirect(req.body.redirect);
};

export default createUser;

const validateEmail = (email="") => {
  return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password="") => {
    return  /[A-Z]/       .test(password) &&
            /[a-z]/       .test(password) &&
            /[0-9]/       .test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length > 8;
}