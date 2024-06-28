/*
Filename:
  optiplex/system/routes/frontend/system.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { minify } from "minify";
import { config } from "dotenv";

config({ path: "../.env" });

// minify js & css if not in the local dev environment
let js = "";
let css = "";
if (process.env.ENVIRONMENT === "local") {
  js = `<script src="/js/system.js"></script>`;
  css = `<link rel="stylesheet" href="/css/styles.css"><link rel="stylesheet" href="/css/system.css">`;
} else {
  js = "<script> " + await minify("../system/web/js/system.js", {
    "js": {
      "mangle": true,
      "mangleClassNames": true,
      "removeUnusedVariables": true,
      "removeConsole": false,
      "removeUselessSpread": true
    }
  }) + " </script>";
  css = "<style> " + await minify("../system/web/css/styles.css") + " </style>";
}

export default function (req, res) {
  res.render("pages/system", { css, js, system_name: get_system(req.params.id) });
}

function get_system(id){
    return "14 Grange Drive";
}
