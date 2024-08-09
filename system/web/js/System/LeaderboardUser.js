class LeaderboardUser {
    constructor(data) {
        this.element = document.createElement("div");
        this.element.classList.add("leaderboard-user")

        this.element.innerHTML = `
            <a title="${data.name}" href="#/user/${data.id}">
            <div class="user-pp" style="background-image:url('/svg/user/${data.pp}.svg')"></div>
            </a>
            <a title="${data.name}" class="user-name" href="#/user/${data.id}">${data.name}</a>
            <p class="user-score">${data.score}</p>
        `;

        return this.element;
    }
}

export default LeaderboardUser;