import { GET, POST } from "../Utilities/Fetch.js";

export default async function(main, id){
    document.title = "Join a System - The System";
    main.innerHTML = "<h2>Joining System...</h2>";

    const response = await GET(`/api/system/${id}/join`);
    if(!response.success){
        main.innerHTML += "Failed to join system: ";
        main.innerHTML += response.message;
        return;
    }

    window.location.hash = `#/system/${response.id}`;
}