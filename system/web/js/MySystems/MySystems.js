import { GET } from "../Utilities/Fetch.js";
import SystemOverview from "./SystemOverview.js";

export default async function(main){
    document.title = "My Systems - The System";

    const response = await GET("/api/system/overview");
    if(!response) return;

    main.innerHTML = `
<form class="quick-form" id="form-join-a-system" action="/api/system/join" method="get">
    <h2>Join a System</h2>
    <input type="text" name="id" autocomplete="off" placeholder="System Join Code" />
    <input type="submit" value="Request to Join System" />
</form>

<h2>My Systems</h2>
<div id="my-systems"></div>
    `;

    for (const r of response) main.appendChild(new SystemOverview(r));
}