/*
Filename:
  optiplex/system/web/js/system.js
Description:
  

Project:
  system #0002 (system.oli.casa) 

Oliver Cass (c) 2024
All Rights Reserved
*/

window.onload = ()=>{
    load("leaderboard", "/api/system/SYSTEM_ID/users", User);
    load("meals", "/api/system/SYSTEM_ID/meals", Meal);
}

const load = async (container_id, url, content_type, follow_up=(res)=>{}) => {
    const container = document.getElementById(container_id);
    const response = await (await fetch(url)).json();
    container.innerHTML = "";
    for(const r of response) container.appendChild(new content_type(r));
    follow_up(response);
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
    set innerHTML(html) {
        this.element.innerHTML = html;
    }
}

class User extends Div {
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
