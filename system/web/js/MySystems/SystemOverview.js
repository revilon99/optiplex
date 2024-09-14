class SystemOverview{
    constructor(data){
        this.element = document.createElement("div");
        this.element.classList.add("system-overview");
        this.element.innerHTML = `
            <a title="${data.name}" class="system-overview-name" href="#/system/${data.id}"><div style="background-image:url('/svg/system/${data.pp}.svg')" class="system-overview-pp"></div>${data.name}</a>
            <p class="system-overview-score">${data.score}</p>
        `;
        return this.element;
    }
}

export default SystemOverview;