/*
Filename:
  optiplex/auth/controller/update.js
Description:
  This script handles updating the user info, including:
   - Updating password

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

// External Libraries
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { config }  from "dotenv";

// Load Environment Parameters
config({path: "../.env"});

// Load User Mongoose Schema
import User from "../schema/User.js";

export async function updatePassword (req, res) {
  const invalid_credentials = ()=>{res.redirect("/myaccount?error=INVALID_CREDENTIALS");};
  const bad_password        = ()=>{res.redirect("/myaccount?error=BAD_PASSWORD");};
  const bad_match           = ()=>{res.redirect("/myaccount?error=BAD_MATCH");};
  const hard_logout         = ()=>{res.redirect("/api/logout/hard");};

  // 1) get email and password from request body
  const { password, new_password, new_password_confirm } = req.body;
  let user_id = "";
  try{
    const jwt_token = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
    user_id = jwt_token.id;
  }catch{
    return hard_logout();
  }
 
  // 2) Find user by email
  const user = await User.findById(user_id);
  console.log(user);
  if(!user) return hard_logout();

  // 4) Check if current password is correct
  const password_match = await compare(password, user.password);
  if (!password_match) return invalid_credentials();

  // 5) Check new password is valid
  if(!validatePassword(new_password)) return bad_password();
  if(!(new_password === new_password_confirm)) return bad_match();

  // 6) Change the password
  const salt = 10;
  const hashedPassword = await hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();

  res.redirect("/myaccount?msg=SUCCESS")
};

const validatePassword = (password="") => {
  return  /[A-Z]/       .test(password) &&
          /[a-z]/       .test(password) &&
          /[0-9]/       .test(password) &&
          /[^A-Za-z0-9]/.test(password) &&
          password.length >= 8;
}
