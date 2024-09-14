import PageNotFound from "../PageNotFound/PageNotFound.js";
import { GET } from "../Utilities/Fetch.js";
import ProfileCard from "./ProfileCard.js";
import UserPagePost from "./UserPagePost.js";

export default async function(main, user_id){
    main.innerHTML = "<h1>User Profile</h1>";
    
    const user = await GET(`/api/user/${user_id}`);
    if(!user) {
        PageNotFound(main);
        return;
    }

    document.title = `${user.name} - The System`;

    main.appendChild(new ProfileCard(user));

    main.innerHTML += "<h2 style='text-align:center'>Posts</h2>";
    for(const p of user.posts) main.appendChild(new UserPagePost(p));
}