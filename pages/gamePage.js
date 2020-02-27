import swipeService from "./../services/swipeService.js"
import _arrayQuestionService from "../services/arrayQuestionService.js"
// import AddQuestions from "./addQuestions.js"



export default class GamePage {
    constructor() {
        this.gameRef = _db.collection("games");
        this.curGame = "";
        this.curRule = "";
        this.template();
        this.showRules();
        this.questions = [];
        this.gameName();

        // this.calcArrayLength();

        // Swipe
        this.swipeZone = document.getElementById('gameContainer');
        this.swiper = swipeService.swiper;
        // swipe end
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
            infoLabel.style.backgroundImage = "url(/img/X_icon.svg)"
        } else {
            rulesBox.classList.add('hide');
            infoLabel.style.backgroundImage = "url(/img/info_icon.svg)"
        }

    }

    // Toggle function for adding more players and content in the game
    showAdd() {
        let checkBox = document.querySelector("#add");
        let rulesBox = document.querySelector("#addSection");
        let infoLabel = document.querySelector('#addLabel');
        if (checkBox.checked == true) {
            rulesBox.classList.remove('hide');
            infoLabel.style.backgroundImage = "url(/img/X_icon.svg)"
        } else {
            rulesBox.classList.add('hide');
            infoLabel.style.backgroundImage = "url(/img/plus_icon.svg)"
        }
    }



    //Function to handle swipes
    swiper() {
        swiper.init(swipeZone, function (swipe) {
            console.log(swipe)
        })
    }


    // Takes questions from the array partyContentArray from the addQuestions page, and geneeates them into single game pages
    gameName() {
        let questionList = "";
        let itemsProcessed = 0;
        let numberOfItems = _arrayQuestionService.partyContentArray.length;
        let randomQuestions = this.shuffle(_arrayQuestionService.partyContentArray);

        randomQuestions.forEach(async question => {

            await this.gameRef.doc(`${question.game}`).get().then(doc => {
                let gameData = doc.data()
                console.log(gameData);
                questionList += /*html*/ `
                <article class="${question.game}"><h2>${gameData.gameTitle}</h2>${question.questionContent} 
                <input id="info" class="hide" type="checkbox" onclick="showRules()"><label id="infoLabel" class="btn" for="info"></label>
                <section id="rules" class="hide"><h2>Regler for ${gameData.gameTitle}</h2>
                <p>${gameData.rules}</p></section></article></article>
                `

                itemsProcessed++;
                if (itemsProcessed === numberOfItems) {
                    document.querySelector('#gameContainer').innerHTML = questionList;

                }

            })
        });
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

}