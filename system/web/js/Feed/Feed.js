import { GET } from "../Utilities/Fetch.js";
import Post from "./Post.js";

export default async function(main){
    document.title = "Home - The System";

    const response = await GET("/api/feed");
    if(!response) return;

    main.innerHTML = "";    

    for (const r of response) main.appendChild(new Post(r));
}