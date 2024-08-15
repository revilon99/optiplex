import { GET, POST } from "../Utilities/Fetch.js";

export default async function (main) {
    document.title = "Sign Up - The System";

    main.innerHTML = "";

    // test whether client should be signing up
    const access = await GET("/api/access");
    if(access){
        window.location.hash = "#/home/";
        return;
    }

    const dialog_container = document.createElement("div");
    dialog_container.classList.add("signup-dialog");

    const dialog = document.createElement("p");
    let position = 0;
    dialog.innerHTML = messages[position]();

    const triangle = document.createElement("div");
    triangle.classList.add("signup-dialog-triangle");

    dialog_container.appendChild(dialog);
    dialog_container.appendChild(triangle);

    main.appendChild(dialog_container);

    const chef = document.createElement("div");
    chef.classList.add("signup-chef");
    main.appendChild(chef);

    let input = {};
    const form = document.createElement("form");
    form.classList.add("signup-form");

    main.appendChild(form);

    const next_button = document.createElement("div");
    next_button.classList.add("signup-next-button");
    next_button.innerHTML = "Continue";
    next_button.title = "Continue";

    next_button.addEventListener("click", async () => {
        position++;

        switch (position) {
            case 2:
                const name_input = document.createElement("input");
                name_input.type = "text";
                name_input.placeholder = "Full Name";
                name_input.name = "name";
                name_input.autocomplete = "name";

                form.innerHTML = "";
                form.appendChild(name_input);
                break;
            case 3:
                input.name = form.querySelector("input[type='text']").value;
                form.innerHTML = "";
                break;
            case 5:
                form.innerHTML = `
                    <div class="signup-food" style="background-image: url('/svg/tasty/taco.svg')"></div>
                    <div class="signup-food" style="background-image: url('/svg/tasty/steak.svg')"></div>
                `;
                break;
            case 6:
                form.innerHTML = ``;
                break;
            case 7:
                form.innerHTML = `
                    <div class="signup-food" style="background-image: url('/svg/tasty/served-plate.svg')"></div>
                    <div class="signup-food" style="background-image: url('/svg/tasty/served-plate.svg')"></div>
                    <div class="signup-food" style="background-image: url('/svg/tasty/served-plate.svg')"></div>
                    <div class="signup-food" style="background-image: url('/svg/tasty/served-plate.svg')"></div>
                `;
                next_button.innerHTML = "Begin";
                break;
            default:
                break;
        }

        if (position < messages.length) {
            dialog.innerHTML = messages[position](input);
        } else {
            await POST("/api/signup", input);
            window.location.hash = "#/home/";
        }
    }, false);

    main.appendChild(next_button);
}

const messages = [
    () => "Welcome to The System!",
    () => "This is a new Social Media that allows you to keep track of the communal cooking in a house or a flat share.",
    () => "First, to get started please enter your name",
    // todo: select profile picture
    (data) => `Welcome, ${data.name}!`,
    () => "The System is simple",
    () => "One meal is equal to another meal",
    () => "For every meal you cook in a System, you are owed a meal",
    () => "For example, if you cook for 4 other people, you will be owed 4 meals"
];