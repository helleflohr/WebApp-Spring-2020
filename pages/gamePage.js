export default class GamePage {
    constructor() {
        this.template();
        this.showRules();
    }

    template() {
        // Onclick NEXT
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="gamePage" class="page">
        
        <button class="btn" type="button" name="settingsPage" onclick="navigateTo(this.name)">Settings</button>
        <p>Import x/X</p>
        
        <p>Import Gamename</p>
        <p>Import Gamecontent</p>

        <input id="info" class="hide" type="checkbox" onclick="showRules()"><label id="infoLabel" class="btn" for="info">i</label>
        <input id="add" class="hide" type="checkbox" onclick="showAdd()"><label id="addLabel" class="btn" for="add">+</label>
        

        <section class="hide" id="rules"><h2>Regler for XXX</h2>
        <p>Reglerne...</p></section>
        <section class="hide" id="addSection"><h2>Tilføj Spillere</h2>
        <p>Tilføj spillere...</p>
        
        <h2>Tilføj Spørgsmål</h2>
        <p>Tilføj...</p>
        </section>

        </article>
        `;
    }

    showRules() {

        let checkBox = document.querySelector("#info");
        let rulesBox = document.querySelector("#rules");
        let infoLabel = document.querySelector('#infoLabel');
        if (checkBox.checked == true) {
            rulesBox.classList.remove('hide');
            infoLabel.innerHTML = "X"
        } else {
            rulesBox.classList.add('hide');
            infoLabel.innerHTML = "i"
        }
    }

    showAdd() {

        let checkBox = document.querySelector("#add");
        let rulesBox = document.querySelector("#addSection");
        let infoLabel = document.querySelector('#addLabel');
        if (checkBox.checked == true) {
            rulesBox.classList.remove('hide');
            infoLabel.innerHTML = "X"
        } else {
            rulesBox.classList.add('hide');
            infoLabel.innerHTML = "+"
        }
    }

}