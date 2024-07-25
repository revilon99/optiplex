import Div from './Div.js'

class SystemOverview extends Div{
    constructor(data){
        super("system-overview");
        this.innerHTML = `
            <a title="${data.name}" onclick="load_system('${data.id}')" class="system-overview-name" href="#/system/${data.id}"><div style="background-image:url('/svg/system/${data.pp}.svg')" class="system-overview-pp"></div>${data.name}</a>
            <p class="system-overview-score">${data.score}</p>
        `;
        return this.element;
    }
}

export default SystemOverview;