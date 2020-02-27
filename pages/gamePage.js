// import swipeService from "./../services/swipeService.js;"
import _arrayQuestionService from "../services/arrayQuestionService.js"




export default class GamePage {
    constructor() {
        this.gameRef = _db.collection("games");
        this.curGame = "";
        this.curRule = "";
        this.template();

        this.questions = [];


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
        <input id="info" class="hide" type="checkbox" onclick="showRules()">
                <label id="infoLabel"  class="btn" for="info"></label>
                <div id="rules" class="hide">
                <h2>Regler for:</h2>
                </div>

        <div id="gameContainer">
      
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
    
        </article>
        `;
    }

    // Toggle function for the rules in the game
    showRules() {
        console.log("showRules");
        let name = "";
        let checkBox = document.querySelector(`#info`);
        let rulesBox = document.querySelector(`#rules`);
        let infoLabel = document.querySelector(`#infoLabel`);
        if (checkBox.checked == true) {
            rulesBox.classList.remove('hide');
            infoLabel.style.backgroundImage = "url(/img/X_icon.svg)"
        } else {
            rulesBox.classList.add('hide');
            infoLabel.style.backgroundImage = "url(/img/info_icon.svg)"
        }

    }
    // <input id="info" class="hide" type="checkbox" onclick="showRules()"><label id="infoLabel" class="btn" for="info"></label>
    //         <section class="hide" id="rules"><h2>Regler for ${this.curGame}</h2>
    //         <p>${this.curRule}</p></section>

    // Toggle function for adding more players and content in the game
    // showAdd() {
    //     let checkBox = document.querySelector("#add");
    //     let rulesBox = document.querySelector("#addSection");
    //     let infoLabel = document.querySelector('#addLabel');
    //     if (checkBox.checked == true) {
    //         rulesBox.classList.remove('hide');
    //         infoLabel.style.backgroundImage = "url(/img/X_icon.svg)"
    //     } else {
    //         rulesBox.classList.add('hide');
    //         infoLabel.style.backgroundImage = "url(/img/plus_icon.svg)"
    //     }
    // }



    // Takes questions from the array partyContentArray from the addQuestions page, and geneeates them into single game pages
    gameName() {
        let questionList = "";
        let insert = "";
        let itemsProcessed = 0;
        let numberOfItems = _arrayQuestionService.partyContentArray.length;
        let randomQuestions = this.shuffle(_arrayQuestionService.partyContentArray);
        let gameRulesIds = [];

        randomQuestions.forEach(async question => {

            await this.gameRef.doc(`${question.game}`).get().then(doc => {
                let gameData = doc.data();
                let gameId = doc.id;
                let gameRules = gameData.rules;

                questionList += /*html*/ `
                <article class="${question.game}">
                <h2>${gameData.gameTitle}</h2>${question.questionContent}          
                </article>
                `
                if (!gameRulesIds.includes(gameId)) {
                    insert += /*html*/ `
                <h3>${gameData.gameTitle}</h3>
                <p>${gameRules}</p>`
                    gameRulesIds.push(gameId);
                }


                itemsProcessed++;
                if (itemsProcessed === numberOfItems) {
                    document.querySelector('#gameContainer').innerHTML = questionList;
                    document.querySelector(`#rules`).innerHTML += insert;
                    // swipeService.init('gameContainer');
                }
                // document.querySelector(`#rules${question.addedId}`).innerHTML = gameRules;


            });
        });
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}