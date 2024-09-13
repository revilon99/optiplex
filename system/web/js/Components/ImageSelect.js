class ImageSelect {
    constructor(collection = "user", selection = "", images = [""], on_select = (img) => { }, show_x = true) {
        this.element = document.createElement("div");
        this.element.className = "image-select";

        if (show_x) {
            const button_close = document.createElement("div");
            button_close.classList.add("image-select-close");
            button_close.innerHTML = "x";
            let _this = this;
            button_close.addEventListener("click", function () {
                _this.element.style.display = "none";
            }, false);

            this.element.appendChild(button_close);
        }


        for (const image of images) this.element.appendChild(new ImageOption(collection, selection, image, on_select));

        return this.element;
    }

}

class ImageOption {
    constructor(collection = "user", selection = "", image = "", on_select = (img) => { }) {
        this.element = document.createElement("div");
        this.element.className = "image-option";

        this.element.innerHTML = `
            <div style="background-image: url('/svg/${collection}/${image}.svg')"></div>
        `;

        if (selection === image) this.element.classList.add("active");

        this.element.addEventListener("click", () => {
            document.querySelectorAll(".image-option").forEach((a) => a.classList.remove("active"));
            this.element.classList.add("active");
            on_select(image);
        }, false);

        return this.element;
    }
}

export default ImageSelect;