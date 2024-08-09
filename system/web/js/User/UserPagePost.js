import Post from "../Feed/Post.js";

class UserPagePost extends Post {
    constructor(data) {
        super(data);
        this.element = document.createElement("div");
        this.element.classList.add("post");

        this.element.appendChild(super.header(data, data.system_name != undefined));
        this.element.appendChild(super.content(data, data.eaters != undefined));
        this.element.appendChild(super.footer(data));


        return this.element;
    }
}

export default UserPagePost;