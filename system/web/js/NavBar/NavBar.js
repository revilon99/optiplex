// todo build the navbar from here - but this will do for now

export function toggle_to(page){
    document.getElementById(page + "-button").classList.add("active");
}

export function clear(){
    const navbar = document.querySelectorAll(".nav-bar-tab");
    for(const n of navbar) n.classList.remove("active");
}