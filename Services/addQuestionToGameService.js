import _arrayNewQuestionService from "./arrayNewQuestionService.js"

class AddQuestionToGameService {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.gameRef = _db.collection("games");

        this.games = [];
        this.questions = [];
    }

    // This function creates an empty array. 
    // It pushes a new object to the array, for each new game id. 
    fetchGames() {
        this.games = [];
        this.gameRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {
                let game = doc.data();
                game.id = doc.id;
                this.games.push(game);
            })
            this.fetchQuestions();
        })
    }


    // This function creates an empty array. 
    // It pushes a new object to the array, for each new question id. 
    fetchQuestions() {
        this.questions = [];
        this.questionRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {
                let question = doc.data();
                question.id = doc.id;
                this.questions.push(question);
            })
            this.createQuestionsList();
        })
    }


    // This function creates a list of all the games, and puts in all the questions, where the value of 
    // question.game is equeal to game.id. There by sorting the questions by games.
    createQuestionsList() {
        let listItem = "";

        this.games.forEach(game => {
            let listItems = "";
            this.questions.forEach(question => {

                if (question.game == game.id) { // Checks if the question is a part of the "current" game
                    if (!game.questions) { //If theres no questions for the game
                        game.questions = []; // the array of questions is set to empty
                    }

                    game.questions.push(question); //Push the questions that is a part of the "current" game into a game array of questions


                    if (game.questions.length == 1) { // If theres a question in the game array add it to the DOM
                        // After the game headline add all the questions with the matching gameId
                        this.questions.forEach(question => {
                            if (question.game == game.id) {
                                listItems += /*html*/ `
                                    <p id="id${question.id}" class="label checkboxNotCheked" onclick="checkbox(this, '${question.id}')">${question.questionContent}</p>
                                `
                            }
                        })


                        listItem += /*html*/ `<article id="#dbGameArticle${game.id}">
                            <h3 class="bold" onclick="showOrHideContent(this)">${game.gameTitle}<img src="./../img/hide.svg" id="arrow${game.id}" class="arrow"> </h3>
                            <div>
                                ${listItems}
                            </div>
                        </article>`

                    }
                }
            })
        })
        document.querySelector("#list").innerHTML = listItem;
    }


    createAddedQuestionsList() {
        let listItem = "";

        if (_arrayNewQuestionService.partyContentArray.length === 0) { // If basket is empty ...
            listItem += `<h3>Du har endnu ikke valgt nogle <br>spørgsmål til spillet</h3>` // ... insert message 
        }

        this.games.forEach(game => {
            let addedContent = ""

            for (let question of _arrayNewQuestionService.partyContentArray) { // Run thrugh the array of added questions
                if (question.game === game.id) { // If the game id matches add some html to a value
                    addedContent += /*html*/ `
                        <p id="${question.addedId}" class="label checkboxNotCheked" onclick="removeFromList(this, '${question.addedId}')">${question.questionContent}</p>
                    `
                }
            }
            listItem += /*html*/ `<article id='gameArticle${game.id}'>
            <h3 class="bold">${game.gameTitle}</h3>
            ${addedContent} <!-- add the html here if the game id´s matches -->
          </article>
         `

        })
        document.querySelector("#addedQuestionsArticle").innerHTML = listItem;

        this.emptyGame('gameArticle'); // Check for games without questions in the partyContentArray
    }

    emptyGame(whichSpecificId) {
        this.games.forEach(game => { // For each game in the array (added from firebase) ...
            let gameArticle = document.querySelector(`#${whichSpecificId}${game.id}`);
            let pContainer = gameArticle.getElementsByTagName("DIV");

            if (pContainer.childElementCount == 1) { // ... if, theres only one child element (the headline) in the article ...
                gameArticle.classList.add('displayNone'); // ... then display none to the article
            }
        })
    }

    showOrHideContent(headline) {
        // console.log(idForGameArticle)
        // let gameArticle = document.querySelector(`#${headline}`)
        let pContainer = headline.nextElementSibling;
        console.log(headline, pContainer)

        pContainer.classList.toggle('displayNone')
        // gameArticle.classList.add("displayNone");

        let show = "./../img/show.svg",
            hide = "./../img/hide.svg";
        let imgElement = document.getElementById(`#arrow${game.id}`);

        imgElement.src = (imgElement.src === show) ? hide : show;
    }

}
const _addQuestionToGameService = new AddQuestionToGameService();
export default _addQuestionToGameService;