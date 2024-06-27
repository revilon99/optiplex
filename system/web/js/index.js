/*
Filename:
  optiplex/system/web/js/index.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

const PAGES = [
    "home", "add", "system", "account"
];
let current_page = 0;

window.onload = () => {
    add_event_listeners();

    load_feed();
    switch_to_page(0);
}

const add_event_listeners = () => {
    for (let i = 0; i < PAGES.length; i++) {
        document.getElementById(PAGES[i] + "-button").addEventListener("click", () => {
            switch_to_page(i);
        }, false);
    }
}

const load_feed = async () => {
    const feed = document.getElementById("home");

    // get request to feed api
    const posts = await (await fetch("/api/feed")).json(); // simulate response for wireframe

    feed.innerHTML = "";
    for (const p of posts) feed.appendChild(new Post(p));
}

const switch_to_page = (page) => {
    document.getElementById(PAGES[current_page]).className = "";
    document.getElementById(PAGES[current_page] + "-button").classList.remove("active");
    current_page = page;
    document.getElementById(PAGES[current_page]).className = "active";
    document.getElementById(PAGES[current_page] + "-button").classList.add("active");
}

class Div {
    constructor(className = "") {
        this.element = document.createElement("div");
        this.element.className = className;
    }

    appendChild(e) {
        this.element.appendChild(e);
    }
}

class Post extends Div {
    constructor(data) {
        super("post")

        // header
        let header = document.createElement("div");
        header.className = "post-header";
        header.innerHTML = `
            <div title="${data.name}" class="post-header-pp"><a aria-label="${data.name}" href="/user?ID=${data.user_id}"><svg width="40px" height="40px"><use href="#plate-egg" width="40px" height="40px"/></svg></a></div>
            <a href="/user?ID=${data.user_id}" title="${data.name}" class="post-header-user">${data.name}</a>
            <p class="post-header-date">${data.date}</p>
            <a title="${data.system}" href="/system?ID=${data.system_id}" class="post-header-system">${data.system}</a>
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

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});