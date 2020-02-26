import swipeService from "./../services/swipeService.js"
// import AddQuestions from "./addQuestions.js"



export default class GamePage {
    constructor() {
        this.gameRef = _db.collection("games");
        this.curGame = "";
        this.curRule = "";
        this.template();
        this.showRules();
        this.questions = [];
        // this.calcArrayLength();

        // Slider
        this.swipeZone = document.getElementById('container');
        this.swiper = swipeService.swiper;
        // slider end


    }
    // let addQuestions = new AddQuestions();
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
        
        <input id="add" class="hide" type="checkbox" onclick="showAdd()"><label id="addLabel" class="btn" for="add"></label>
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
            infoLabel.innerHTML = "<img src='./../X_icon.svg'>";
        } else {
            rulesBox.classList.add('hide');
            infoLabel.innerHTML = "<img src='./../img /Info_icon.svg>";
        }
    }

    // Toggle function for adding more players and content in the game
    showAdd() {
        let checkBox = document.querySelector("#add");
        let rulesBox = document.querySelector("#addSection");
        let infoLabel = document.querySelector('#addLabel');
        if (checkBox.checked == true) {
            rulesBox.classList.remove('hide');
            infoLabel.innerHTML = "<img src='./../X_icon.svg'>"
        } else {
            rulesBox.classList.add('hide');
            infoLabel.innerHTML = "<img src='./../plus_icon.svg'>"
        }
    }



    //Function to handle swipes
    swiper() {
        swiper.init(swipeZone, function (swipe) {
            console.log(swipe)
        })
    }


    // Takes questions from the array partyContentArray from the addQuestions page, and geneeates them into single game pages
    addQuestionsToGame() {
        let pages = "";
        console.log(addQuestions.partyContentArray)
        this.questions = addQuestions.partyContentArray;
        console.log(this.questions);
        pages += /*html*/ `
<div id="game${game.id}">${game.gameTitle}<br>${question.questionContent}</div>
`
    }
}