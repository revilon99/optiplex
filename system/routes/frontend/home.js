/*
Filename:
  optiplex/system/routes/frontend/home.js
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
let index_js = "";
let index_css = "";
if (process.env.ENVIRONMENT === "local") {
  index_js = `<script src="/js/index.js"></script>`;
  index_css = `<link rel="stylesheet" href="/css/styles.css">`;
} else {
  index_js = "<script> " + await minify("../system/web/js/index.js", {
    "js": {
      "mangle": true,
      "mangleClassNames": true,
      "removeUnusedVariables": true,
      "removeConsole": false,
      "removeUselessSpread": true
    }
  }) + " </script>";
  index_css = "<style> " + await minify("../system/web/css/styles.css") + " </style>";
}

export default function (req, res) {
  console.log(res.locals.id);
  res.render("pages/index", { index_js, index_css, auth_url: process.env.AUTH_URL });
}
