import { capitalize } from "../Utilities/Text.js";

class Post {
    constructor(data) {
        this.element = document.createElement("div");
        this.element.className = "post";

        this.element.appendChild(this.header(data, data.user_in_system));
        this.element.appendChild(this.content(data, false));
        this.element.appendChild(this.footer(data));

        return this.element;
    }

    header(data, include_system = true) {
        // header
        let header = document.createElement("div");
        header.className = "post-header";
        header.innerHTML = `
            <div title="${data.name}" class="post-header-pp"><a aria-label="${data.name}" href="#/user/${data.user_id}"><div class="user-pp" style="background-image:url('/svg/user/${data.pp}.svg')"></div></a></div>
            <a href="#/user/${data.user_id}" title="${data.name}" class="post-header-user">${data.name}</a>
            <p class="post-header-date">${data.date}</p>
        `;
        if (include_system) header.innerHTML += `
            <a title="${data.system_name}" href="#/system/${data.system_id}" class="post-header-system">${data.system_name}</a>
        `
        return header;
    }

    content(data, include_eaters = false) {
        let content = document.createElement("div");
        content.className = "post-content";
        content.innerHTML = `
            <div class="meal-image" style="background-image: url('/svg/plate/${data.img}.svg')"></div>
            <h2>${data.title}</h2>
            <p>
            ${data.description}
            </p>`;

        if (include_eaters) {
            let eaters = document.createElement("div");
            eaters.classList.add("meal-eaters");
            for (const e of data.eaters) eaters.innerHTML += `
                <a title="${e.name}" href="#/user/${e.id}/"><div class="meal-eaters-pp" style="background-image:url('/svg/user/${e.pp}.svg')"></div>${e.name}</a>
            `;
            content.appendChild(eaters);
        }


        content.innerHTML += `
            <div class="post-stats">
                <div class="likes"><p>${data.num_likes}</p><svg width="40px" height="40px"><use href="#button-like"/></svg></div>
                <div class="shares"><p>${data.num_shares}</p><svg width="40px" height="40px"><use href="#button-share"/></svg></div>
                <div class="comments"><p>${data.num_comments}</p><svg width="40px" height="40px"><use href="#button-comment"/></svg></div>
            </div>`;
        return content;
    }

    footer(data) {
        // footer
        let footer = document.createElement("div");
        footer.className = "post-footer";
        const buttons = ["like", "comment", "share"];
        this.buttons = {};
        for (let b of buttons) {
            let button = document.createElement("div");
            button.className = `button ${b}`;
            button.title = capitalize(b);
            button.innerHTML = `<svg width="35px" height="35px"><use href="#button-${b}"/></svg>`;

            footer.appendChild(button);
            this.buttons[b] = button;
        }

        this.liked = false;

        let post = this;

        function update_footer() {
            let likes = data.num_likes;

            if (post.liked) {
                post.buttons.like.classList.add("active");
                likes++;
            } else {
                post.buttons.like.classList.remove("active");
            }

            post.element.querySelector("div.post-content").querySelector("div.likes").querySelector("p").innerHTML = likes;
        }

        this.buttons.like.addEventListener("click", () => {
            post.liked = !post.liked
            update_footer();
        }, false);

        this.buttons.comment.addEventListener("click", ()=>{
            throw Error
        });
        this.buttons.share.addEventListener("click", ()=>{
            throw Error
        });

        return footer;
    }
}

export default Post;