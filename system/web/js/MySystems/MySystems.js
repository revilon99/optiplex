import SystemOverview from "./SystemOverview.js";

export default async function(main){
    document.title = "My Systems - The System";

    main.innerHTML = `
<form class="quick-form" id="form-join-a-system" action="/api/system/join" method="get">
    <h2>Join a System</h2>
    <input type="text" name="id" autocomplete="off" placeholder="System Join Code" />
    <input type="submit" value="Request to Join System" />
</form>

<h2>My Systems</h2>
<div id="my-systems"></div>
    `;

    const response = await (await fetch("/api/system/overview")).json();
    for (const r of response) main.appendChild(new SystemOverview(r));
}