import { GET } from "../Utilities/Fetch.js";
import Post from "../Components/Post.js";

export default async function(main){
    document.title = "Home - The System";

    const response = await GET("/api/feed");
    if(!response) return;

    main.innerHTML = "";    

    for (const r of response) main.appendChild(new Post(r));

    if(response.length < 1) main.innerHTML += `<br>Nothing to show! Try joining a system.`;
}