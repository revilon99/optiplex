import Post from "./Post.js";

export default async function(main){
    document.title = "Home - The System";
    main.innerHTML = "";

    const response = await (await fetch("/api/feed")).json();
    for (const r of response) main.appendChild(new Post(r));
}