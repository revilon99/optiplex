import LeaderboardUser from "./LeaderboardUser.js";
import SystemPagePost from "./SystemPagePost.js";

export default async function (main, system_id){
    main.innerHTML = "";

    const system_overview = await (await fetch(`/api/system/${system_id}`)).json();

    document.title = `${system_overview.name} - The System`;

    // system name
    main.innerHTML += `<div style="background-image:url('/svg/system/${system_overview.pp}.svg')" class="system-overview-pp"></div>`;
    const title = document.createElement("h1");
    title.classList.add("system-overview")
    title.innerHTML = system_overview.name;
    main.appendChild(title);

    // leaderboard
    // todo: sort on server-side
    const leaderboard = document.createElement("div");
    const users = await (await fetch(`/api/system/${system_id}/users`)).json();
    for(const user of users) leaderboard.appendChild(new LeaderboardUser(user));
    main.appendChild(leaderboard);

    // meals
    main.innerHTML += `<h2 style="text-align: center">Meals</h2>`;
    const feed = document.createElement("div");
    const meals = await (await fetch(`/api/system/${system_id}/meals`)).json();
    for(const meal of meals) feed.appendChild(new SystemPagePost(meal));

    main.appendChild(feed);
}