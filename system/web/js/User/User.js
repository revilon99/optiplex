import ProfileCard from "./ProfileCard.js";
import UserPagePost from "./UserPagePost.js";

export default async function(main, user_id){
    main.innerHTML = "<h1>User Profile</h1>";
    
    const overview = await (await fetch(`/api/user/${user_id}`)).json();

    document.title = `${overview.name} - The System`;

    main.appendChild(new ProfileCard(overview));

    main.innerHTML += "<h2 style='text-align:center'>Posts</h2>";
    const posts = await (await fetch(`/api/user/${user_id}/posts`)).json();
    for(const p of posts) main.appendChild(new UserPagePost(p));

    
}