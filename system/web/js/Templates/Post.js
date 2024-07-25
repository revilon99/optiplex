class Post extends Div {
    constructor(data) {
        super("post");
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