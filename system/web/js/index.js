/*
Filename:
  optiplex/system/web/js/index.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

const PAGES = ["home", "add", "system", "account", "system-overview"];
let current_page = 0;

window.onload = () => {
    add_event_listeners();
    load("home", "/api/feed", Post);
    load("my-systems", "/api/system/overview", SystemOverview, (res) => {
        const select = $("form-add-a-meal-system-select");
        select.innerHTML = '<option value="" disabled selected>Select a system...</option>';
        for(const r of res) select.innerHTML += `<option value='${r.id}'>${r.name}</option>`
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

    $("form-add-a-meal-system-select").addEventListener("change", async (e)=>{
        const system_id = e.target.value;
        const response = await (await fetch(`/api/system/${system_id}/others`)).json();

        $("form-add-a-meal-who-ate").innerHTML = "<label>Who Ate?</label>";
        for(const r of response) $("form-add-a-meal-who-ate").innerHTML += `
        <div>
          <input type="checkbox" id="form-add-a-meal-who-ate-${r.id}" name="whoate[]" value="${r.id}" onchange="show_tags()">
          <label for="form-add-a-meal-who-ate-${r.id}">${r.name}</label>
        </div>`;

        $("form-add-a-meal-who-ate").classList.add("visible")
    }, false);
}

const load = async (container_id, url, content_type, follow_up=(res)=>{}) => {
    const container = $(container_id);
    const response = await (await fetch(url)).json();
    container.innerHTML = "";
    for(const r of response) container.appendChild(new content_type(r));
    follow_up(response);
}

const switch_to_page = (page) => {
    $(PAGES[current_page]).className = "";
    $(PAGES[current_page] + "-button").classList.remove("active");
    current_page = page;
    $(PAGES[current_page]).className = "active";
    $(PAGES[current_page] + "-button").classList.add("active");
}

let tags_shown = false;
const show_tags = () => {
    if(tags_shown) return;
    $("form-add-a-meal-tags").classList.add("visible");
}

class Div {
    constructor(className = "") {
        this.element = document.createElement("div");
        this.element.className = className;
    }

    appendChild(e) {
        this.element.appendChild(e);
    }

    /**
     * @param {string} html
     */
    set innerHTML(html){
        this.element.innerHTML = html;
    }
}

class Post extends Div {
    constructor(data) {
        super("post")

        // header
        let header = document.createElement("div");
        header.className = "post-header";
        header.innerHTML = `
            <div title="${data.name}" class="post-header-pp"><a aria-label="${data.name}" href="/user/${data.user_id}"><svg width="40px" height="40px"><use href="#plate-egg" width="40px" height="40px"/></svg></a></div>
            <a onclick="load_user('${data.user_id}')" href="#/user/${data.user_id}" title="${data.name}" class="post-header-user">${data.name}</a>
            <p class="post-header-date">${data.date}</p>
            <a title="${data.system}" onclick="load_system('${data.system_id}')" href="#/system/${data.system_id}" class="post-header-system">${data.system}</a>
        `;

        // content
        let content = document.createElement("div");
        content.className = "post-content";
        content.innerHTML = `
            <div class="post-image"><svg width="200px" height="200px"><use href="#plate-egg"/></svg></div>
            <h2>${data.title}</h2>
            <p>
            ${data.description}
            </p>
            <div class="post-stats">
                <div class="likes"><p>${data.num_likes}</p><svg width="40px" height="40px"><use href="#button-like"/></svg></div>
                <div class="shares"><p>${data.num_shares}</p><svg width="40px" height="40px"><use href="#button-share"/></svg></div>
                <div class="comments"><p>${data.num_comments}</p><svg width="40px" height="40px"><use href="#button-comment"/></svg></div>
            </div>
        `;

        // footer
        let footer = document.createElement("div");
        footer.className = "post-footer";
        const buttons = ["like", "dislike", "comment", "share"];
        this.buttons = {};
        for (let b of buttons) {
            let button = document.createElement("div");
            button.className = `button ${b}`;
            button.title = b.capitalize();
            button.innerHTML = `<svg width="35px" height="35px"><use href="#button-${b}"/></svg>`;

            footer.appendChild(button);
            this.buttons[b] = button;
        }

        this.liked = false;
        this.disliked = false;

        let post = this;

        function update_footer() {
            let likes = data.num_likes;

            if (post.liked) {
                post.buttons.like.classList.add("active");
                likes++;
            } else {
                post.buttons.like.classList.remove("active");
            }

            if (post.disliked) {
                post.buttons.dislike.classList.add("active");
                likes--;
            } else {
                post.buttons.dislike.classList.remove("active");
            }

            content.querySelector("div.likes").querySelector("p").innerHTML = likes;
        }

        this.buttons.like.addEventListener("click", () => {
            post.liked = !post.liked
            if (post.liked && post.disliked) post.disliked = false;
            update_footer();
        }, false);
        this.buttons.dislike.addEventListener("click", () => {
            post.disliked = !post.disliked
            if (post.liked && post.disliked) post.liked = false;
            update_footer();
        }, false);

        this.appendChild(header);
        this.appendChild(content);
        this.appendChild(footer);

        return this.element;
    }
}

class SystemOverview extends Div{
    constructor(data){
        super("system-overview");
        this.innerHTML = `
            <a title="${data.name}" class="system-overview-name" href="/system/${data.id}"><div style="background-image:url('/svg/system/${data.pp}.svg')" class="system-overview-pp"></div>${data.name}</a>
            <p class="system-overview-score">${data.score}</p>
        `;
        return this.element;
    }
}

class LeaderboardUser extends Div {
    constructor(data) {
        super("user")

        this.innerHTML = `
            <a title="${data.name}" href="/user/${data.id}">
            <div class="user-pp" style="background-image:url('/svg/user/${data.pp}.svg')"></div>
            </a>
            <a title="${data.name}" class="user-name" href="/user/${data.id}">${data.name}</a>
            <p class="user-score">${data.score}</p>
        `;

        return this.element;
    }
}

class Meal extends Div {
    constructor(data) {
        super("post")

        // header
        let header = document.createElement("div");
        header.className = "post-header";
        header.innerHTML = `
            <a aria-label="${data.name}" href="/user/${data.user_id}"><div title="${data.name}" class="post-header-pp" style="background-image:url('/svg/user/${data.pp}.svg')"></div></a>
            <a href="/user/${data.user_id}" title="${data.name}" class="post-header-user">${data.name}</a>
            <p class="post-header-date">${data.date}</p>`;

        // content
        let content = document.createElement("div");
        content.className = "post-content";
        content.innerHTML = `
            <div class="meal-image" style="background-image: url('/svg/plate/${data.img}.svg')"></div>
            <h2>${data.title}</h2>
            <p>
            ${data.description}
            </p>`;
        
        let eaters = document.createElement("div");
        eaters.classList.add("meal-eaters");
        for(const e of data.eaters) eaters.innerHTML += `
            <a title="${e.name}" href="/user/${e.id}/"><div class="meal-eaters-pp" style="background-image:url('/svg/user/${e.pp}.svg')"></div>${e.name}</a>
        `;

        content.appendChild(eaters);       

        content.innerHTML += `
            <div class="post-stats">
                <div class="likes"><p>${data.num_likes}</p><svg width="40px" height="40px"><use href="#button-like"/></svg></div>
                <div class="shares"><p>${data.num_shares}</p><svg width="40px" height="40px"><use href="#button-share"/></svg></div>
                <div class="comments"><p>${data.num_comments}</p><svg width="40px" height="40px"><use href="#button-comment"/></svg></div>
            </div>`;

        // footer
        let footer = document.createElement("div");
        footer.className = "post-footer";
        const buttons = ["like", "dislike", "comment", "share"];
        this.buttons = {};
        for (let b of buttons) {
            let button = document.createElement("div");
            button.className = `button ${b}`;
            button.title = b.capitalize();
            button.innerHTML = `<svg width="35px" height="35px"><use href="#button-${b}"/></svg>`;

            footer.appendChild(button);
            this.buttons[b] = button;
        }

        this.liked = false;
        this.disliked = false;

        let post = this;

        function update_footer() {
            let likes = data.num_likes;

            if (post.liked) {
                post.buttons.like.classList.add("active");
                likes++;
            } else {
                post.buttons.like.classList.remove("active");
            }

            if (post.disliked) {
                post.buttons.dislike.classList.add("active");
                likes--;
            } else {
                post.buttons.dislike.classList.remove("active");
            }

            content.querySelector("div.likes").querySelector("p").innerHTML = likes;
        }

        this.buttons.like.addEventListener("click", () => {
            post.liked = !post.liked
            if (post.liked && post.disliked) post.disliked = false;
            update_footer();
        }, false);
        this.buttons.dislike.addEventListener("click", () => {
            post.disliked = !post.disliked
            if (post.liked && post.disliked) post.liked = false;
            update_footer();
        }, false);

        this.appendChild(header);
        this.appendChild(content);
        this.appendChild(footer);

        return this.element;
    }
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
