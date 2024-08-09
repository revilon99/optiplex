import { clear as clear_navbar, toggle_to as highlight_navbar } from './NavBar/NavBar.js';

import Feed from './Feed/Feed.js';
import AddMeal from './AddMeal/AddMeal.js';
import PageNotFound from './PageNotFound/PageNotFound.js';
import MyAccount from './MyAccount/MyAccount.js';
import MySystems from './MySystems/MySystems.js';
import System from './System/System.js';
import User from './User/User.js';

const main = document.getElementById("main");

export const load_from_hash = () => {
    if(window.location.hash==="") window.location.hash = "#/home/";

    const hash = window.location.hash;
    const path = hash.split("/");

    clear_navbar();
    switch(path[1]){
        case "home":
            highlight_navbar("home");
            return Feed(main);
        case "add":
            highlight_navbar("add");
            return AddMeal(main);
        case "my-systems":
            highlight_navbar("system");
            return MySystems(main);
        case "my-account":
            highlight_navbar("account");
            return MyAccount(main);

        case "system":
            return System(main, path[2]);
        case "user":
            return User(main, path[2]);
        default:
            return PageNotFound(main);
    }
}
