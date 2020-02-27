import _arrayQuestionService from "./arrayQuestionService.js"

class AddQuestionToGameService {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.gameRef = _db.collection("games");

        this.games = [];
        this.questions = [];
    }
    // This function creates an empty array. It pushes a new object to the array, for each new game id. 
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


    // This function creates an empty array. It pushes a new object to the array, for each new question id. 
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
            this.questions.forEach(question => {


                if (question.game == game.id) { // Checks if the question is a part of the "current" game
                    if (!game.questions) { //If theres no questions for the game
                        game.questions = []; // the array of questions is set to empty
                    }

                    game.questions.push(question); //Push the questions that is a part of the "current" game into a game array of questions

                    if (game.questions.length == 1) { // If theres a question in the game array add it to the DOM
                        listItem += /*html*/ `<article>
                        <h3 class="bold">${game.gameTitle}</h3>
                        </article>`

                        // After the game headline add all the questions with the matching gameId
                        this.questions.forEach(question => {
                            if (question.game == game.id) {
                                listItem += /*html*/ `
                                <p id="${question.id}" class="label checkboxNotCheked" onclick="checkbox(this.id)">${question.questionContent}</p>
                                `
                            }
                        })
                    }

                }
            })
        })

        document.querySelector("#list").innerHTML = listItem;

    }

    createAddedQuestionsList() {
        let listItem = "";



        // Insert message if basket is empty
        if (_arrayQuestionService.partyContentArray.length === 0) {
            listItem += `Du har endnu ikke valgt nogle spørgsmål til spillet`
        }


        this.games.forEach(game => {
            let addedContent = ""
            for (let question of _arrayQuestionService.partyContentArray) {
                if (question.game === game.id) {




                    if (question.game == game.id) {
                        addedContent += /*html*/ `
                    <p id="${question.addedId}" class="label checkboxNotCheked" onclick="removeFromList(this.id)">${question.questionContent}</p>
                    `
                    }

                }

            }

            listItem += /*html*/ `<article id='gameArticle${game.id}'>
          <h3 class="bold">${game.gameTitle}</h3>
          ${addedContent}
          </article>
         `

        })
        document.querySelector("#addedQuestionsArticle").innerHTML = listItem;
        console.log(listItem)

        this.games.forEach(game => {
            let gameArticle = document.querySelector(`#gameArticle${game.id}`);
            if (gameArticle.childElementCount == 1) {
                gameArticle.classList.add('displayNone');
            }
        })


        // let theDivWithInputs = document.querySelector("#addedQuestionsArticle");
        // let tags = theDivWithInputs.getElementsByTagName("H3");
        // console.log(tags)
        // for (let i = 0, n = tags.length; i < n; i = i + 1) {
        //   // let checkBox = document.getElementById(`${tags[i].id}`);
        //   console.log(tags.nextElementSibling)
        //   // if (tags.nextElementSibling == true) {
        //   //     this.choosenCategoriesArr.push(`${tags[i].id}`)
        //   //     // document.querySelector(`[for=${tags[i].id}]`).style.background = 'var(--secundary_color_dark)'
        //   // }
        //   // checkBox.checked = false;
        // }

        // let gameHeadline = document.querySelector(`#added${game.id}`);
        // console.log(gameHeadline.nextElementSibling)
    }

}
const addQuestionToGameService = new AddQuestionToGameService();
export default addQuestionToGameService;