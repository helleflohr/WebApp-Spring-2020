export default class AddPlayersPage {
    constructor() {
        this.template();

    }

    template() {


        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="addPlayers" class="page">
        <h2>Tilføj dig selv</h2>
        <input id="myName" type="text" placeholder="Skriv dit spillernavn" class="inputfield">

        <h2>Tilføj spillere uden mobil</h2>
        <div id="playerInput">
        <input type="text" placeholder="Skriv spillernavn" class="inputfield myFriends">
        </div>

        <br>
        <button class="btn" type="button" onclick="addAnotherPlayer('playerInput')">+</button>
        <br>
       
        <button class="btn" type="button" name="addQuestions" onclick="navigateTo(this.name);addPlayers()">GOGOGO!</button>
        </article>
        `;

    }

    addAnotherPlayer(whereToAdd) {
        // let listOfOtherPlayers = document.getElementById("playerInput");

        // listOfOtherPlayers.add(new Input());
        console.log('playerAdded')

        let x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("placeholder", "Skriv spillernavn");
        x.setAttribute("class", "inputfield myFriends")
        document.querySelector(`#${whereToAdd}`).appendChild(x);
    }
}