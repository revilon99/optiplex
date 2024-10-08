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
import User from "../../schema/User.js";
import { createSecretToken, RandomString } from "../../jwt/Token.js";
import { hash } from "bcrypt";
import { send as sendEmail } from "../../mail/mail.js"

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
      path: "/",                                // Cookie is accessible from all paths
      domain: process.env.ROOT_URL,
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true,                             // Cookie will only be sent over HTTPS
      httpOnly: false,                          // Cookie cannot be accessed via client-side scripts
      sameSite: "None"
    });

    sendEmail([user.email], "Welcome to oli.casa", "Welcome to oli.casa", `
      <h1>Welcome to oli.casa, ${user.email}!</h1>
      <p>
        We are so glad that you have joined.
      </p>

      <p>
        if you have any questions, please reach out to <a href="mailto:info@oli.casa">info@oli.casa</a>
      </p>
      `);

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
            password.length >= 8;
}