import _arrayNewQuestionService from "./../services/arrayNewQuestionService.js"
// import loaderService from "./../services/loader.js"

export default class GamePage {
    constructor() {
        this.gameRef = _db.collection("games");
        this.template();
        this.questions = [];
    }


    // The HTML-content for the game-"page"
    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="gamePage" class="page">
        <input id="info" class="hide" type="checkbox" onclick="showRules()">
         <label id="infoLabel"   for="info"></label>
         <article id="rules" class="hide">
         <h2>Regler for:</h2>
         </article>

        <section id="gameContainer">
      
        </section>
        
        <section class="hide" id="addSection">
        `;
    }

    // Function that changes the icon for the rules box, and hides and shows the article with the rules
    showRules() {
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
    generateGamePages() {
        navigateTo('gamePage');
        // loaderService.show(true);
        let questionList = "";
        let insert = "";
        let itemsProcessed = 0;
        let numberOfItems = _arrayNewQuestionService.partyContentArray.length;
        let newArray = this.shuffle(_arrayNewQuestionService.partyContentArray);
        // let randomQuestions = this.shuffle(_arrayNewQuestionService.partyContentArray);
        let gameRulesIds = [];

        console.log(newArray);

        for (var counter = 0; counter < newArray.Lenght; counter++)

        // for (let question of newArray) 
        {

            let question = newArray[counter];

            this.gameRef.doc(`${question.game}`).get().then(doc => {
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

                    let gamePagesAndFinalPage = /*html*/ ` ${questionList}
                    <article class="${question.game}">
                    <h2>Tak for spillet</h2>
                    <button class="btn" onclick="navigateTo('addQuestions')">Spil igen</button>         
                    </article>
                    `

                    document.querySelector('#gameContainer').innerHTML = gamePagesAndFinalPage;
                    document.querySelector(`#rules`).innerHTML += insert;
                    window.swipe();
                }
            });
        };
        // loaderService.show(false);
    }

    // Thus function takes the array of added questions and shuffels them, so they are displayed randomly in the game
    // the function is called inside the generateGamePages() function.

    // Fisher–Yates shuffle (https://bost.ocks.org/mike/shuffle/)
    shuffle(array) {
        var m = array.length,
            t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
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