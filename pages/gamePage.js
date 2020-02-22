export default class GamePage {
    constructor() {
        this.template();
    }

    template() {
        // Onclick NEXT
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="gamePage" class="page">
        
        <button class="btn" type="button">Settings</button>
        <p>Import x/X</p>
        
        <p>Import Gamename</p>
        <p>Import Gamecontent</p>
        
        </article>
        `;
    }
}