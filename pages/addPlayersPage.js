export default class AddPlayersPage {
    constructor() {
        this.template();

    }

    template() {


        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="addPlayers" class="page">
        <h2>Tilføj dig selv</h2>
        <input type="text">
        <h2>Tilføj spillere uden mobil</h2>
        <input type="text">
        <button class="btn" type="button">+</button>
        <br>
       
        <button class="btn" type="button" name="addQuestions" onclick="navigateTo(this.name)">GOGOGO!</button>
        </article>
        `;

    }
}