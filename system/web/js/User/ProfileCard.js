class ProfileCard {
    constructor(data) {
        const ele = document.createElement("div");
        ele.classList.add("profilecard")

        ele.innerHTML += `
            <div title="${data.name}" class="post-header-pp"><a aria-label="${data.name}"><div class="user-pp" style="background-image:url('/svg/user/${data.pp}.svg')"></div></a></div>
        `;

        // name
        const title = document.createElement("h3");
        title.innerHTML = data.name;
        ele.appendChild(title);

        // last post
        const last_post = document.createElement("a");
        last_post.classList.add("last-post");
        last_post.innerHTML = `Latest post: ${data.last_post}`;
        ele.appendChild(last_post);        

        return ele;
    }
}

export default ProfileCard;