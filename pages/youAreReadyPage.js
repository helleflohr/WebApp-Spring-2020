export default class YouAreReadyPage {
    constructor() {
        this.template();

    }

    template() {


        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="playersReady" class="page">
        <h2>I spiller på spilmesterens device</h2>

        <p>Du og X andre er klar :)</p>
        
        <br>
             <button class="btn" type="button" name="addPlayers" onclick="navigateTo(this.name)">
             Nej vent, jeg har et spørgsmål mere!</button>
        </article>
        `;

    }
}