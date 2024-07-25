import Div from './Div.js';

class LeaderboardUser extends Div {
    constructor(data) {
        super("user")

        this.innerHTML = `
            <a title="${data.name}" href="/user/${data.id}">
            <div class="user-pp" style="background-image:url('/svg/user/${data.pp}.svg')"></div>
            </a>
            <a title="${data.name}" class="user-name" href="/user/${data.id}">${data.name}</a>
            <p class="user-score">${data.score}</p>
        `;

        return this.element;
    }
}

export default LeaderboardUser;