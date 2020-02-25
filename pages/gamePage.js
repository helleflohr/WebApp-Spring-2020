import swipeService from "./../services/swipeService.js"
// import AddQuestions from "./pages/addQuestions.js"
// let addQuestions = new AddQuestions();

export default class GamePage {
    constructor() {
        this.gameRef = _db.collection("games");
        this.curGame = "";
        this.curRule = "";
        this.template();
        this.showRules();
        this.questionRef = _db.collection("questions");
        // this.calcArrayLength();

        // Slider
        this.swipeZone = document.getElementById('container');
        this.swiper = swipeService.swiper;
        // slider end


    }

    getData() {
        // let inputField = document.querySelector('#joinPartyId');
        this.gamesRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {

                let games = doc.data();
                games.id = doc.id;

                this.curGame = games.gameTitle;
                this.curRule = games.rules;
            })
        })
    }

    // The HTML-content for this game-"page"
    template() {
        // Onclick NEXT
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="gamePage" class="page">
        <input id="info" class="hide" type="checkbox" onclick="showRules()"><label id="infoLabel" class="btn" for="info"></label>
        <section class="hide" id="rules"><h2>Regler for ${this.curGame}</h2>
        <p>${this.curRule}</p></section>

        <div id="container">
        <img src="../img/P_20181006_163258.jpg">
        <img src="../img/P_20181006_163258.jpg">
        <img src="../img/P_20181006_163258.jpg">
        <img src="../img/P_20181006_163258.jpg">
    
        </div>
        
        
        <section class="hide" id="addSection">
        
        <h2>Tilføj flere spillere</h2>
        <div id="morePlayers">
        <input type="text" placeholder="Skriv spillernavn" class="inputfield moreFriends">
        </div>

        <br>
        <button class="btn" type="button" onclick="addAnotherPlayer('morePlayers')"></button>
        <br>
       
        <button class="btn" type="button" onclick="addPlayers()">GOGOGO!</button>
        
        <h2>Tilføj Spørgsmål</h2>
        <p>Tilføj...</p>
        </section>
        
        <input id="add" class="hide" type="checkbox" onclick="showAdd()"><label id="addLabel" class="btn" for="add">+</label>
        </article>
        `;
    }

    // Toggle function for the rules in the game
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

    // Toggle function for adding more players and content in the game
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



    //Function to handle swipes
    swiper() {
        swiper.init(swipeZone, function (swipe) {
            console.log(swipe)
        })
    }

    // calcArrayLength() {
    //     let length = addQuestions.partyContentArray.length;
    //     let widthCalc = length * 100;
    //     document.querySelector("#container").style.width = `${widthCalc}%`
    // }

    addQuestionsToGame() {

    }
}