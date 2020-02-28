import _arrayQuestionService from "../services/arrayQuestionService.js"

export default class GamePage {
    constructor() {
        this.gameRef = _db.collection("games");
        this.template();
        this.questions = [];
    }


    // The HTML-content for this game-"page"
    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="gamePage" class="page">
        <input id="info" class="hide" type="checkbox" onclick="showRules()">
         <label id="infoLabel"   for="info"></label>
         <div id="rules" class="hide">
         <h2>Regler for:</h2>
         </div>

        <div id="gameContainer">
      
        </div>
        
        <section class="hide" id="addSection">
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


    // Takes questions from the array partyContentArray from the addQuestions page, and geneeates them into single game pages
    // it also takes the rules for every game and checks if it is shown in the #rules div box, if it isn't, then it adds it.
    gameName() {
        let questionList = "";
        let insert = "";
        let itemsProcessed = 0;
        let numberOfItems = _arrayQuestionService.partyContentArray.length;
        console.log(_arrayQuestionService.partyContentArray);
        let randomQuestions = this.shuffle(_arrayQuestionService.partyContentArray);
        let gameRulesIds = [];

        console.log(randomQuestions);

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
                }
            });
        });
    }

    // Thus function takes the array of added questions and shuffels them, so they are displayed randomly in the game
    // the function is called inside the gameName() function.
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}



//  <h2>Tilføj flere spillere</h2>
// <div id="morePlayers">
// <input type="text" placeholder="Skriv spillernavn" class="inputfield moreFriends">
// </div>

// <br>
// <button class="btn" type="button" onclick="addAnotherPlayer('morePlayers')"></button>
// <br>

// <button class="btn" type="button" onclick="addPlayers()">GOGOGO!</button>

// <h2>Tilføj Spørgsmål</h2>
// <p>Tilføj...</p>
// </section>

// </article> 


// this.curGame = "";
// this.curRule = "";
// getData() {
//     // let inputField = document.querySelector('#joinPartyId');
//     this.gamesRef.get().then(snapshotData => {
//         snapshotData.forEach(doc => {

//             let games = doc.data();
//             games.id = doc.id;

//             this.curGame = games.gameTitle;
//             this.curRule = games.rules;
//         })
//     })
// }