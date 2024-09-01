import PageNotFound from "../PageNotFound/PageNotFound.js";
import { GET, POST } from "../Utilities/Fetch.js";
import LeaderboardUser from "./LeaderboardUser.js";
import SystemPagePost from "./SystemPagePost.js";

export default async function (main, system_id) {
    main.innerHTML = "";

    const system_overview = await GET(`/api/system/${system_id}`);
    if (!system_overview) {
        PageNotFound(main);
        return;
    }

    document.title = `${system_overview.name} - The System`;

    main.innerHTML += `
    <div style="background-image:url('/svg/system/${system_overview.pp}.svg')" class="system-overview-pp"></div>
    `;

    const edit_form = edit_system_template(system_overview);

    const edit_button = edit_button_template();
    let editing = false;

    edit_button.addEventListener("click", () => {
        editing = !editing;

        if (editing) {
            edit_form.classList.add("active");
            edit_button.classList.add("active");
        } else {
            edit_form.classList.remove("active");
            edit_button.classList.remove("active");
        }

    }, false);

    const title = document.createElement("h1");
    title.classList.add("system-overview");
    title.innerHTML = system_overview.name;

    main.appendChild(edit_button);
    main.appendChild(title);
    main.appendChild(edit_form);

    // leaderboard
    // todo: sort on server-side

    const users = await GET(`/api/system/${system_id}/users`);
    if (!users) return;

    const leaderboard = document.createElement("div");
    for (const user of users) leaderboard.appendChild(new LeaderboardUser(user));

    main.appendChild(leaderboard);

    // meals
    const meal_title = document.createElement("h2");
    meal_title.style.textAlign = "center";
    meal_title.innerHTML = "Meals";

    const feed = document.createElement("div");
    const meals = await GET(`/api/system/${system_id}/meals`);
    if (!meals) return;

    for (const meal of meals) feed.appendChild(new SystemPagePost(meal));

    main.appendChild(meal_title);
    main.appendChild(feed);
}

function edit_button_template() {
    const component = document.createElement("div");
    component.classList.add("edit-button");
    component.title = "Edit System";
    component.innerHTML = `<svg><use href="#button-edit"/></svg>`;
    return component;
}

function edit_system_template(data) {
    const root = document.createElement("div");
    root.classList.add("edit-system");

    const button_add_user = document.createElement("div");
    button_add_user.title = "Add User";
    button_add_user.innerHTML = `<svg><use href="#add-user"/></svg>`;
    button_add_user.classList.add("edit-button");
    button_add_user.addEventListener("click", function () {
        const copyText = `${window.location.origin}/#/join/${data.id}`;
        navigator.clipboard.writeText(copyText);
        alert("Copied Join URL to Clipboard");
    }, false);

    root.appendChild(button_add_user);

    const form = document.createElement("form");
    form.classList.add("quick-form");

    const title = document.createElement("h2");
    title.innerHTML = "Edit System";

    const input_name_label = document.createElement("label");
    input_name_label.innerHTML = "System Name:";

    const input_name = document.createElement("input");
    input_name.type = "text";
    input_name.value = data.name;
    input_name.name = "name";
    input_name.autocomplete = false;

    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Edit";

    form.onsubmit = () => {
        try {
            POST(`/api/system/${data.id}/edit`, {
                name: input_name.value
            }).then(res => {
                window.location.reload();
            });

        } catch (e) {
            console.log(e);
        }
        return false;
    }

    form.appendChild(title);
    form.appendChild(input_name_label);
    form.appendChild(input_name);
    form.appendChild(submit);

    const button_delete = document.createElement("button");
    button_delete.classList.add("warning");
    button_delete.innerHTML = "Delete System";
    button_delete.addEventListener("click", () => {
        try {
            if (confirm(`Are you sure you want to delete ${data.name}?`)) {
                // Delete it!
                POST(`/api/system/${data.id}/delete`, {}).then(res => {
                    window.location.hash = "#/home/"
                });
            } else {
                // Do nothing!
            }
        } catch (e) {
            console.log(e);
        }
    }, false);

    const button_leave = document.createElement("button");
    button_leave.classList.add("warning");
    button_leave.innerHTML = "Leave System";
    button_leave.addEventListener("click", () => {
        try {
            if (confirm(`Are you sure you want to leave ${data.name}?`)) {
                POST(`/api/system/${data.id}/leave`, {}).then(res => {
                    window.location.hash = "#/home/"
                });
            } else {
                // Do nothing!
            }
        } catch (e) {
            console.log(e);
        }
    }, false);

    root.appendChild(form);
    root.appendChild(button_leave);
    root.appendChild(button_delete);

    return root;
}