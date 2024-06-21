/*
Filename:
  optiplex/auth/mail/mail.js
Description:
  This script handles send mail through Mailgun

Project:
  auth #0001 (auth.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import FormData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY, url: 'https://api.eu.mailgun.net'});

export function send(from="oli.casa <noreply@oli.casa>", to=[], subject="", text="", html=""){
    mg.messages.create('mg.oli.casa', {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
}
