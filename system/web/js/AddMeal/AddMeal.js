
export default async function (main) {
    document.title = "Add Meal - The System";
    //TODO: make this more event driven
    main.innerHTML = `
<h1>Add Meal</h1>
<form id="form-add-a-meal" action="/api/meal/add" method="post">
    <div class="section visible">
        <label>Date:</label>
        <input type="date" id="form-add-a-meal-date-cooked" name="date-cooked" required />
    </div>
    <div class="section visible">
        <label>System:</label>
        <select name="system" id="form-add-a-meal-system-select" required></select>
    </div>
    <div id="form-add-a-meal-who-ate" class="checkbox-group section">
    </div>

    <div id="form-add-a-meal-tags" class="section">
        <label>Your Meal:</label>
        <input type="text" name="name" placeholder="Meal Name..." autocomplete="off" required />
        <input type="text" name="description" placeholder="Meal Description..." autocomplete="off" required />
        <label>Photo:</label>
        <p>
            Add photo functionality here
        </p>
    </div>


    <input type="submit" value="Add Meal" />
</form>
    `

    const systems = await (await fetch("/api/system/overview")).json();
    const select = document.getElementById("form-add-a-meal-system-select");
    select.innerHTML = '<option value="" disabled selected>Select a system...</option>';
    for (const r of systems) select.innerHTML += `<option value='${r.id}'>${r.name}</option>`;
    
    document.getElementById("form-add-a-meal-system-select").addEventListener("change", async (e) => {
        const system_id = e.target.value;
        const response = await (await fetch(`/api/system/${system_id}/others`)).json();
    
        document.getElementById("form-add-a-meal-who-ate").innerHTML = "<label>Who Ate?</label>";
        for (const r of response) {
            const option = document.createElement("div");
            option.innerHTML = `
            <input type="checkbox" id="form-add-a-meal-who-ate-${r.id}" name="whoate[]" value="${r.id}">
            <label for="form-add-a-meal-who-ate-${r.id}">${r.name}</label>`;

            option.addEventListener("click", ()=>{
                document.getElementById("form-add-a-meal-tags").classList.add("visible");
            }, false);

            document.getElementById("form-add-a-meal-who-ate").appendChild(option);
        }
    
        document.getElementById("form-add-a-meal-who-ate").classList.add("visible")
    }, false);
}




