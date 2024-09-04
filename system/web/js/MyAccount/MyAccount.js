import { GET, POST } from "../Utilities/Fetch.js";

export default async function (main) {
    document.title = "My Account - The System";

    const response = await GET("/api/account");
    if (!response) return;

    main.innerHTML = `
<h1>Manage Account</h1>

<button><a href="${window.AUTH_URL}myaccount">Manage Password</a></button>
<button><a href="${window.AUTH_URL}logout">Logout</a></button>`;

    const edit_name = edit_name_template(response);

    const edit_pp = document.createElement("div");
    edit_pp.innerHTML = `
    <h2>Change Profile Picture</h2>
    <div>
        <p>change profile picture settings here</p>
    </div>`;

    main.appendChild(edit_name);
    main.appendChild(edit_pp);
}

const edit_name_template = (data) => {
    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.innerHTML = "Update Name";

    const form = document.createElement("form");

    const label = document.createElement("label");
    label.innerHTML = "Name: ";

    const input_name = document.createElement("input");
    input_name.type = "text";
    input_name.name = "name";
    input_name.autocomplete = "off";
    input_name.placeholder = data.name;

    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Change Name";

    const err = document.createElement("a");
    err.classList.add("warning");

    form.appendChild(label);
    form.appendChild(input_name);
    form.appendChild(submit);
    form.appendChild(err);

    form.onsubmit = () => {
        POST("/api/user/update/name", {
            name: input_name.value
        }).then(() => {
            window.location.reload();
        }).catch(() => {
            err.innerHTML = "Error changing name. Please try again later.";
        })

        return false;
    }

    container.appendChild(title);
    container.appendChild(form);

    return container;
}
