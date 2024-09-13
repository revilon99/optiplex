import { GET, POST } from "../Utilities/Fetch.js";

export default async function (main) {
    document.title = "Add Meal - The System";

    main.innerHTML = "<h1>Add Meal</h1>";

    const systems = await GET("/api/system/overview");
    if (!systems) return;

    const form = document.createElement("form");

    let section = {};

    section.date = document.createElement("div");
    section.date.classList.add("section", "visible");
    section.date.innerHTML = "<label>Date:</label>";
    const input_date_cooked = document.createElement("input");
    input_date_cooked.name = "date";
    input_date_cooked.type = "date";
    input_date_cooked.required = true;
    input_date_cooked.max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    section.date.appendChild(input_date_cooked);

    section.system = document.createElement("div");
    section.system.classList.add("section", "visible");
    section.system.innerHTML = "<label>System:</label>";

    const input_system = document.createElement("select");
    input_system.name = "system";
    input_system.required = true;
    input_system.innerHTML = '<option value="" disabled selected>Select a system...</option>';
    for (const r of systems) input_system.innerHTML += `<option value='${r.id}'>${r.name}</option>`;

    section.system.appendChild(input_system);

    section.eaters = document.createElement("div");
    section.eaters.classList.add("checkbox-group", "section");

    section.details = document.createElement("div");
    section.details.classList.add("section");
    section.details.innerHTML = "<label>Your Meal:</label>";

    const input_mealname = document.createElement("input");
    input_mealname.name = "mealname";
    input_mealname.type = "text";
    input_mealname.autocomplete = "off";
    input_mealname.required = true;
    input_mealname.placeholder = "Meal Title";

    const input_description = document.createElement("input");
    input_description.name = "description";
    input_description.type = "text";
    input_description.autocomplete = "off";
    input_description.required = true;
    input_description.placeholder = "Description";

    const photo_selection = document.createElement("div");
    photo_selection.innerHTML = `
        <label>Photo:</label>
        <p>
            Add photo functionality here
        </p>
    `;

    section.details.appendChild(input_mealname);
    section.details.appendChild(input_description);
    section.details.appendChild(photo_selection);

    section.submit = document.createElement("input");
    section.submit.type = "submit";
    section.submit.value = "Add Meal";

    for (let s in section) form.appendChild(section[s]);
    main.appendChild(form);

    input_system.addEventListener("change", async () => {
        const system_id = input_system.value;

        const response = await GET(`/api/system/${system_id}/others`);
        if (!response) return;

        section.eaters.innerHTML = "<label>Who Ate?</label>";
        for (const r of response) {
            const option = document.createElement("div");
            option.innerHTML = `
            <input type="checkbox" id="form-add-a-meal-who-ate-${r.id}" name="whoate[]" value="${r.id}">
            <label for="form-add-a-meal-who-ate-${r.id}">${r.name}</label>`;

            option.addEventListener("change", () => {
                section.details.classList.add("visible");
            }, false);

            section.eaters.appendChild(option);
        }

        section.eaters.classList.add("visible")
    }, false);

    form.onsubmit = () => {
        try{
            submit_data();
        }catch(e){
            console.log(e)
        }
        return false; // prevent refresh
    }

    function submit_data(){  
        const add_meal_data = {
            date: input_date_cooked.value,
            system_id: input_system.value,
            who_ate: get_who_ate(),
            title: input_mealname.value,
            description: input_description.value,
            photo: "egg" // TODO
        };
            
        POST("/api/meal/add", add_meal_data).then((data)=>{
            window.location.hash = `/system/${data.system}/`;
        });
    }
}



function get_who_ate(){
    const checked = document.querySelectorAll('input[type=checkbox]:checked');

    let whoate = []
    checked.forEach(e => {if(e.name == "whoate[]") whoate.push(e.value)});
    return whoate;
}