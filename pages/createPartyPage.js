// import spaService from "./services/spa.js"

export default class CreatePartyPage {

    constructor() {
        this.template();

    }

    template() {


        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="createPartyPage" class="page">
        <section class="collectionOfItems">
        <h2>Spilmester: opret gruppe</h2>
    
        <button class="btn" name="settingsPage" onclick="navigateTo(this.name)">Få et gruppe ID</button>
        </section>
        <section class="collectionOfItems">
        <h2>Spillere: Tilslut jer gruppen</h2>
        <input type="text">
        <br>
        <button class="btn" type="button" name="addPlayers" onclick="navigateTo(this.name)">GOGOGO!</button>
        </section>
        </article>
        `;

    }
}