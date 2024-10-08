import Post from "../Components/Post.js";

class SystemPagePost extends Post{
    constructor(data) {
        super(data);
        this.element = document.createElement("div");
        this.element.classList.add("post");

        this.element.appendChild(super.header(data, true));
        this.element.appendChild(super.content(data, true));
        this.element.appendChild(super.footer(data));
        this.element.appendChild(super.comments(data));

        return this.element;
    }
}

export default SystemPagePost;