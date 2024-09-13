import { capitalize } from "../Utilities/Text.js";
import { GET, POST } from "../Utilities/Fetch.js";

class Post {
    constructor(data) {
        this.element = document.createElement("div");
        this.element.className = "post";

        this.element.appendChild(this.header(data, data.user_in_system));
        this.element.appendChild(this.content(data, false));
        this.element.appendChild(this.footer(data));
        this.element.appendChild(this.comments(data));

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
            <div class="meal-image" style="background-image: url('/meal/${data.id}.png')"></div>
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
                <div class="likes"><p>${data.likes.length}</p><svg width="40px" height="40px"><use href="#button-like"/></svg></div>
                <div class="shares"><p>${data.num_shares}</p><svg width="40px" height="40px"><use href="#button-share"/></svg></div>
                <div class="comments"><p>${data.comments.length}</p><svg width="40px" height="40px"><use href="#button-comment"/></svg></div>
            </div>`;
        return content;
    }

    footer(data) {
        // footer
        let footer = document.createElement("div");
        footer.className = "post-footer";
        let buttons = ["like", "comment", "share"];

        if(data.user_post) buttons.push("delete");

        this.buttons = {};
        for (let b of buttons) {
            let button = document.createElement("div");
            button.className = `button ${b}`;
            button.title = capitalize(b);
            button.innerHTML = `<svg width="35px" height="35px"><use href="#button-${b}"/></svg>`;

            footer.appendChild(button);
            this.buttons[b] = button;
        }

        this.liked = data.user_liked_post;
        let post = this;

        let likes = data.likes.length;

        function update_footer() {
            if (post.liked) {
                post.buttons.like.classList.add("active");
            } else {
                post.buttons.like.classList.remove("active");
            }

            post.element.querySelector("div.post-content").querySelector("div.likes").querySelector("p").innerHTML = likes;
        }

        this.buttons.like.addEventListener("click", () => {
            post.liked = !post.liked;

            if (post.liked) {
                const response = GET(`/api/meal/${data.id}/like`);
                likes++;
            } else {
                const response = GET(`/api/meal/${data.id}/unlike`);
                likes--;
            }

            update_footer();
        }, false);

        this.commenting = false;
        this.buttons.comment.addEventListener("click", () => {
            post.commenting = !post.commenting;

            if (post.commenting) {
                post.buttons.comment.classList.add("active");
                post.element.querySelector("div.post-comments").classList.add("active");
            } else {
                post.buttons.comment.classList.remove("active");
                post.element.querySelector("div.post-comments").classList.remove("active");
            }
        });
        this.buttons.share.addEventListener("click", () => {
            // todo
            throw Error;
            update_footer();
        });

        if(data.user_post) this.buttons.delete.addEventListener("click", () => {
            try {
                if (confirm(`Are you sure you want to delete your meal?`)) {
                    // Delete it!
                    GET(`/api/meal/${data.id}/delete`).then(res => {
                        window.location.reload();
                    });
                } else {
                    // Do nothing!
                }
            } catch (e) {
                console.log(e);
            }
        });

        update_footer();
        return footer;
    }

    comments(data) {
        const comments = document.createElement("div");
        comments.classList.add("post-comments");

        const form = document.createElement("form");

        const input_comment = document.createElement("input");
        input_comment.type = "text";
        input_comment.placeholder = "Comment...";
        input_comment.autocomplete = "off";

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Comment";
        submit.title = "Comment";

        form.appendChild(input_comment);
        form.appendChild(submit);

        comments.appendChild(form);

        let post = this;

        form.onsubmit = () => {
            POST(`/api/meal/${data.id}/comment/add`, {
                comment: input_comment.value
            }).then((r) => {
                post.element.querySelector("div.post-comments").appendChild(new Comment(this, data, r));
                post.element.querySelector("div.post-content").querySelector("div.comments").querySelector("p").innerHTML = parseInt(post.element.querySelector("div.post-content").querySelector("div.comments").querySelector("p").innerHTML)+1;
            });

            return false;
        }

        for (const comment of data.comments) {
            comments.appendChild(new Comment(this, data, comment));
        }

        return comments;
    }
}

export default Post;

class Comment {
    constructor(post, data, comment) {
        const root = document.createElement("div");
        root.classList.add("post-comment");

        root.innerHTML = `
            <div title="${comment.author.name}" class="post-header-pp"><a aria-label="${comment.author.name}" href="#/user/${comment.author._id}"><div class="user-pp" style="background-image:url('/svg/user/${comment.author.pp}.svg')"></div></a></div>
            <a href="#/user/${comment.author._id}" title="${comment.author.name}" class="post-header-user">${comment.author.name}</a>
            <a class="post-comment-date">${comment.date}</a>
            <p>${comment.body}</p>
        `;

        if (comment.can_delete) {
            const button_delete = document.createElement("button");
            button_delete.classList.add("delete");
            button_delete.title = "Delete";

            button_delete.addEventListener("click", function () {
                POST(`/api/meal/${data.id}/comment/delete`, {
                    comment: comment
                }).then(() => {
                    root.style.display = "none";
                    post.element.querySelector("div.post-content").querySelector("div.comments").querySelector("p").innerHTML = post.element.querySelector("div.post-content").querySelector("div.comments").querySelector("p").innerHTML-1;
                });
            }, false);

            root.appendChild(button_delete);
        }

        return root;
    }
}