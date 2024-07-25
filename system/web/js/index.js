/*
Filename:
  optiplex/system/web/js/index.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

import Post from './Templates/Post.js'
import Meal from './Templates/Meal.js'
import LeaderboardUser from './Templates/LeaderboardUser.js'
import SystemOverview from './Templates/SystemOverview.js'

const PAGES = ["home", "add", "system", "account", "system-overview", "user"];
let current_page = 0;

window.onload = () => {
    add_event_listeners();
    load("home", "/api/feed", Post);
    load("my-systems", "/api/system/overview", SystemOverview, (res) => {
        const select = $("form-add-a-meal-system-select");
        select.innerHTML = '<option value="" disabled selected>Select a system...</option>';
        for (const r of res) select.innerHTML += `<option value='${r.id}'>${r.name}</option>`
    });
    switch_to_page(0);
}

const add_event_listeners = () => {
    for (let i = 0; i < 4; i++)
        $(PAGES[i] + "-button").addEventListener("click", () => switch_to_page(i), false);

    $("add-button").addEventListener("click", () => {
        tags_shown = false;
        $("form-add-a-meal-who-ate").classList.remove("visible");
        $("form-add-a-meal-tags").classList.remove("visible");
    }, false);

    $("form-add-a-meal-system-select").addEventListener("change", async (e) => {
        const system_id = e.target.value;
        const response = await (await fetch(`/api/system/${system_id}/others`)).json();

        $("form-add-a-meal-who-ate").innerHTML = "<label>Who Ate?</label>";
        for (const r of response) $("form-add-a-meal-who-ate").innerHTML += `
        <div>
          <input type="checkbox" id="form-add-a-meal-who-ate-${r.id}" name="whoate[]" value="${r.id}" onchange="show_tags()">
          <label for="form-add-a-meal-who-ate-${r.id}">${r.name}</label>
        </div>`;

        $("form-add-a-meal-who-ate").classList.add("visible")
    }, false);
}

const load = async (container_id, url, content_type, follow_up = (res) => { }) => {
    const container = $(container_id);
    const response = await (await fetch(url)).json();
    container.innerHTML = "";
    for (const r of response) container.appendChild(new content_type(r));
    follow_up(response);
}

const switch_to_page = (page) => {
    $(PAGES[current_page]).className = "";
    if(current_page < 4) $(PAGES[current_page] + "-button").classList.remove("active");

    current_page = page;
    $(PAGES[current_page]).className = "active";
    if(current_page < 4) $(PAGES[current_page] + "-button").classList.add("active");
    
}

let tags_shown = false;
window.show_tags = () => {
    if (tags_shown) return;
    $("form-add-a-meal-tags").classList.add("visible");
}

// maybe these should be event listeners - lets see how out of hand it gets
window.load_system = (system_id) => {
    console.log(system_id);
    switch_to_page(4);
}
window.load_user = (user_id) => {
    console.log(user_id)
    switch_to_page(5);
}

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

const $ = (id) => {
    return document.getElementById(id);
}
