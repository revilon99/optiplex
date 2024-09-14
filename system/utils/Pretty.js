/*
Filename:
  optiplex/system/utils/Pretty.js
Description:
  a collection of functions to style raw datatypes 
  for api responses

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

export function prettifyDate(date = Date.now()) {
    let timeSincePost = Date.now().valueOf() - date.valueOf();
    if (timeSincePost < 1000 * 60 * 60 * 24 * 7 * 2) { // 2 weeks ago
        if (timeSincePost < 1000 * 60 * 60 * 24 * 7) { // 1 week
            if (timeSincePost < 1000 * 60 * 60 * 24) { // 1 day
                if (timeSincePost < 1000 * 60 * 60) {  // 1 hour
                    if (timeSincePost < 1000 * 60) {   // 1 minute
                        let seconds = Math.floor(timeSincePost / 1000);
                        let plural = seconds == 1 ? '' : 's';
                        if(seconds < 0) seconds = 0;
                        return `${seconds} second${plural} ago`
                    } else {
                        let minutes = Math.floor(timeSincePost / (1000 * 60));
                        let plural = minutes < 2 ? '' : 's';
                        return `${minutes} minute${plural} ago`
                    }
                } else {
                    let hours = Math.floor(timeSincePost / (1000 * 60 * 60));
                    let plural = hours < 2 ? '' : 's';
                    return `${hours} hour${plural} ago`
                }
            } else {
                let days = Math.floor(timeSincePost / (1000 * 60 * 60 * 24));
                let plural = days < 2 ? '' : 's';
                return `${days} day${plural} ago`
            }
        } else return "Over a week ago";
    } else {
        return new Date(date).toLocaleDateString();
    }
}