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

// CSS
// find all css files
let CSS_files = [];
await walk(__dirname.split("system")[0] + "/system/web/css/", function (file) {
  CSS_files.push(file);
});

let index_css = "";
// minify css if not in the local dev environment
if (process.env.SYSTEM_WEBPACK === "off")  for (let file of CSS_files) index_css += `<link rel="stylesheet" href="/css/${file}">`;
else {
  index_css += "<style>";
  for (let file of CSS_files) index_css += await minify(`../system/web/css/${file}`);
  index_css += "</style>";
}

// JavaScript
let index_js = "<script type='module' src='/js/index.js'></script>"; // TODO: use webpack on index.js  

// Render the single-page application (JIT) and store as variable
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
