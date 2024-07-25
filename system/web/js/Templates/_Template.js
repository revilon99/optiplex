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

