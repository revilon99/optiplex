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
import UglifyJs from 'uglify-js'
import { config } from "dotenv";
import ejs from 'ejs';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { promises as fs } from 'fs';
import path from 'path';

async function walk(directoryName, action, root = "") {
  const files = await fs.readdir(directoryName);

  for (const file of files) {
    const f = await fs.stat(directoryName + path.sep + file);
    if (f.isDirectory()) {
      await walk(directoryName + path.sep + file, action, file + "/")
    } else {
      action(root + file)
    }
  }
}

config({ path: "../.env" });

let JS_files = [];
await walk(__dirname.split("system")[0] + "/system/web/js/", function (file) {
  JS_files.push(file);
});
JS_files.reverse();

let CSS_files = [
]
await walk(__dirname.split("system")[0] + "/system/web/css/", function (file) {
  CSS_files.push(file);
});

// print web files
console.log(JS_files);
console.log(CSS_files);

// minify js & css if not in the local dev environment
let all_js = "";
for (let file of JS_files) {
  all_js += await fs.readFile(`../system/web/js/${file}`);
}

let index_js = "";
let index_css = "";
if (process.env.ENVIRONMENT === "local") {
  index_js = "<script> " + all_js + " </script>";
  for (let file of CSS_files) index_css += `<link rel="stylesheet" href="/css/${file}">`;
} else {
  let min_js = UglifyJs.minify(all_js);

  index_js = "<script> " + min_js.code + " </script>";

  index_css += "<style>";
  for (let file of CSS_files) index_css += await minify(`../system/web/css/${file}`);
  index_css += "<style>";
}

// render the single-page application (JIT)
let html = "";
ejs.renderFile(__dirname + "/views/pages/index.ejs",
  { index_js, index_css, auth_url: process.env.AUTH_URL },
  function (err, str) {
    html = str;
  }
);

// serve the single-page application
export default function (req, res) {
  res.send(html);
}
