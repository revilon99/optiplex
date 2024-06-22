/*
Filename:
  optiplex/auth/controller/resetpassword.js
Description:
  Handles the request to reset a users password

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { RandomString } from "../../jwt/Token.js";
import { hash } from "bcrypt";
import { send as sendEmail } from "../../mail/mail.js"
import User from "../../schema/User.js";

// this is a bad practice if hoping to scale project
let activePasswordChangeRequests = [];

// clear active pw change requests every 24 hrs. This may catch some people off-guard. but its easy.
setInterval(()=>{
    activePasswordChangeRequests = [];
}, 1000 * 60 * 60 * 24);

class PWreq{
    constructor(email="", key=""){
        this.email = email;
        this.key = key;
        this.init = Date.now();
    }
}

export async function resetpasswordrequest(req, res){
    const invalid_input   = ()=>{res.redirect("/resetpassword?error=INVALID_INPUT");};
    const user_not_exist  = ()=>{res.redirect("/resetpassword?error=USER_NOT_EXIST");};

    // get user email from request
    if(!req.body.email) return invalid_input();
    const email = req.body.email;

    // see if user exists
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) return user_not_exist();

    // generate a key for 2FA
    const key = RandomString(16);

    // add request to array
    activePasswordChangeRequests.push(new PWreq(email, key));

    let link = `/passwordreset?key=${key}&email=${email}`;
    // console.log("http://localhost:3001" + link);

    link = "https://auth.oli.casa" + link;
    // email request to user
    sendEmail([email], "Reset Password - oli.casa", `Copy this link to reset your password: ${link}`, `
        <h1>Password Reset - oli.casa</h1>
        <p>
        Click this <a href="${link}">link</a> to reset your password. Do not share this link with anybody.
        </p>
        <p>
        Alternatively, copy this link into your browser. <a>${link}</a>.
        </p>
        <p>
        If you did not request to change your password. Do not worry, you don't need to take any further action.
        </p>
    
    `);
    res.redirect("/passwordresetrequested")
}

export async function resetpassword(req, res){
    const bad_password        = ()=>{res.redirect("/passwordreset?error=BAD_PASSWORD");};
    const bad_match           = ()=>{res.redirect("/passwordreset?error=BAD_MATCH");};
    const home                = ()=>{res.redirect("/");};

    // 1) ensure request is valid
    const {email, key, new_password, new_password_confirm} = req.body;
    const valid = validatePasswordChangeRequest(email, key);

    if(!valid) return home();
   
    // 2) Find user by email
    const user = await User.findOne({email: email});
    if(!user) return home();
  
    // 3) Check new password is valid
    if(!validatePassword(new_password)) return bad_password();
    if(!(new_password === new_password_confirm)) return bad_match();
  
    // 6) Change the password
    const salt = 10;
    const hashedPassword = await hash(new_password, salt);
    user.password = hashedPassword;
    await user.save();
  
    res.redirect("/passwordresetsuccessful")
}

export function validatePasswordChangeRequest(email, key){
    const now = Date.now();

    for(let i = 0; i < activePasswordChangeRequests.length; i++){
        if( activePasswordChangeRequests[i].email == email &&
            activePasswordChangeRequests[i].key === key &&
            now - activePasswordChangeRequests[i].init < 1000 * 60 * 30 // 30 minutes
        ) return true;
    }

    return false;
}

const validatePassword = (password="") => {
    return  /[A-Z]/       .test(password) &&
            /[a-z]/       .test(password) &&
            /[0-9]/       .test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length >= 8;
  }
  
