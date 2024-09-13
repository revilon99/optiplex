import ImageSelect from "../Components/ImageSelect.js";
import { GET, POST } from "../Utilities/Fetch.js";
import SystemOverview from "./SystemOverview.js";

export default async function (main) {
    document.title = "My Systems - The System";

    const response = await GET("/api/system/overview");
    if (!response) return;
    /*
    <form class="quick-form" id="form-join-a-system" action="/api/system/join" method="get">
        <h2>Join a System</h2>
        <input type="text" name="id" autocomplete="off" placeholder="System Join Code" />
        <input type="submit" value="Request to Join System" />
    </form>
    */
    main.innerHTML = `
<h2>My Systems</h2>
<div id="my-systems"></div>
    `;

    for (const r of response) main.appendChild(new SystemOverview(r));

    main.appendChild(createSystem());
}

const createSystem = () => {
    const root = document.createElement("div");
    root.innerHTML = `<br><h2>Create a System</h2>`;
    root.classList.add("quick-form");

    const form = document.createElement("form");
    form.style.display = "none";

    const input_name = document.createElement("input");
    input_name.type = "text";
    input_name.name = "name";
    input_name.autocomplete = "off";
    input_name.placeholder = "System Name";

    const input_pp = document.createElement("div");
    let system_pp = "crab";
    GET("/api/res/system-pp")
        .then((list) => {
            input_pp.appendChild(new ImageSelect("system", system_pp, list, (img) => {
                system_pp = img;
            }, false));
        });

    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Create System";

    form.appendChild(input_name);
    form.appendChild(input_pp);
    form.appendChild(submit);

    const button_init = document.createElement("button");
    button_init.innerHTML = "Create a System";

    button_init.addEventListener("click", function (e) {
        form.style.display = "initial";
        button_init.style.display = "none";
    }, false);

    form.onsubmit = () => {
        try {
            POST("/api/system/create", {
                name: input_name.value,
                pp: system_pp
            })
                .then((res) => window.location.hash = `#/system/${res._id}`);
        } catch (e) {
            console.log(e);
        }

        return false;
    }

    root.appendChild(form);
    root.appendChild(button_init);

    return root;
}