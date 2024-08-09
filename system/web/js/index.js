/*
Filename:
  optiplex/system/web/js/index.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import { load_from_hash } from './Directory.js';

window.onload       = load_from_hash;
window.onhashchange = load_from_hash;
